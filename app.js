class EscapeGame {
    constructor() {
        this.scenes = {
            "entree": {
                "title": "Hall d'entrée — La Passerelle",
                "image": "Entry-front_door.png",
                "description": "Tu viens d'entrer sur le campus de NEOMA. Le message d'Alex résonne encore : cinq preuves sont cachées ici. Par où commences-tu ?",
                "hotspots": [
                    { "type": "move", "label": "Vers le couloir central", "icon": "⬆️", "x": 50, "y": 48, "target": "couloir_central" },
                    { "type": "move", "label": "Descendre les escaliers", "icon": "↙️", "x": 18, "y": 78, "target": "entree_downstairs" },
                    { "type": "move", "label": "Vers l'amphithéâtre", "icon": "➡️", "x": 85, "y": 65, "target": "amphi_hall" }
                ]
            },
            "entree_downstairs": {
                "title": "Rez-de-chaussée — Espace Accueil & Détente",
                "image": "entry_downstrairs.jpeg",
                "description": "Te voilà en bas des escaliers. Sur ta droite, les portes vitrées mènent à la grande bibliothèque du campus.",
                "hotspots": [
                    { "type": "move", "label": "Entrer dans la Bibliothèque", "icon": "🚪", "x": 88, "y": 50, "target": "library_left" },
                    { "type": "inspect", "label": "Inspecter les boîtes de retour", "icon": "📦", "x": 76, "y": 55, "puzzleId": "boite_retour" },
                    { "type": "move", "label": "Remonter à la passerelle", "icon": "↗️", "x": 15, "y": 25, "target": "entree" }
                ]
            },
            "library_left": {
                "title": "Bibliothèque — Espace Travail & Accueil",
                "image": "Library-left_side-desks.png",
                "description": "Un vaste espace rempli de tables de travail et de bornes de service.",
                "hotspots": [
                    { "type": "move", "label": "Aller vers les rayonnages (Droite)", "icon": "➡️", "x": 85, "y": 50, "target": "library_right" },
                    { "type": "inspect", "label": "Consulter la borne tactile", "icon": "🖥️", "x": 90, "y": 78, "puzzleId": "borne_tactile" },
                    { "type": "move", "label": "Sortir de la bibliothèque", "icon": "⬅️", "x": 12, "y": 50, "target": "entree_downstairs" }
                ]
            },
            "library_right": {
                "title": "Bibliothèque — Allée des Rayonnages",
                "image": "Library-right_side-bookshelves.jpeg",
                "description": "Des rangées de livres. Un indice est dissimulé entre les étagères.",
                "hotspots": [
                    { "type": "puzzle", "label": "Épreuve 2 : Le Plan Invisible", "icon": "🗺️", "x": 55, "y": 42, "puzzleId": "epreuve_2" },
                    { "type": "move", "label": "Retour vers les tables (Gauche)", "icon": "⬅️", "x": 15, "y": 50, "target": "library_left" }
                ]
            },
            "amphi_hall": {
                "title": "Foyer de l'Amphithéâtre",
                "image": "Amphitheatre_outside.jpeg",
                "description": "Tu arrives devant les doubles portes de l'amphithéâtre. Un digicode bloque l'accès.",
                "hotspots": [
                    { "type": "inspect", "label": "Examiner le chevalet", "icon": "🔍", "x": 46, "y": 62, "puzzleId": "indice_chevalet" },
                    { "type": "locked_move", "label": "Portes Amphithéâtre (Gauche)", "icon": "🔒", "x": 17, "y": 44, "target": "amphitheatre", "lockId": "porte_amphi" },
                    { "type": "locked_move", "label": "Portes Amphithéâtre (Droite)", "icon": "🔒", "x": 72, "y": 45, "target": "amphitheatre", "lockId": "porte_amphi" },
                    { "type": "move", "label": "Retour vers l'entrée", "icon": "⬇️", "x": 50, "y": 86, "target": "entree" }
                ]
            },
            "amphitheatre": {
                "title": "Grand Amphithéâtre",
                "image": "Amphitheatre.jpeg",
                "description": "L'amphithéâtre est désert, des dossiers sont sur le pupitre.",
                "hotspots": [
                    { "type": "puzzle", "label": "Épreuve 1 : Inspecter le pupitre", "icon": "📂", "x": 86, "y": 62, "puzzleId": "epreuve_1" },
                    { "type": "move", "label": "Sortir vers le foyer", "icon": "⬅️", "x": 29, "y": 24, "target": "amphi_hall" }
                ]
            },
            "couloir_central": {
                "title": "Couloir Central (En attente)",
                "image": "Entry-front_door.png",
                "description": "Zone en attente de ta prochaine photo !",
                "hotspots": [
                    { "type": "move", "label": "Retour à l'entrée", "icon": "⬇️", "x": 50, "y": 85, "target": "entree" }
                ]
            }
        };

        this.currentSceneId = "entree";
        this.inventory = [];
        this.unlockedDoors = {};
        this.timeRemaining = 35 * 60;
        this.timerInterval = null;

        this.init();
    }

    init() {
        this.setupUI();
        this.startTimer();
        this.loadScene(this.currentSceneId);

        document.getElementById('modal-briefing').classList.add('active');
    }

    setupUI() {
        document.getElementById('btn-briefing').addEventListener('click', () => {
            document.getElementById('modal-briefing').classList.add('active');
        });

        document.getElementById('btn-inventory').addEventListener('click', () => {
            this.renderInventory();
            document.getElementById('modal-inventory').classList.add('active');
        });

        document.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.getAttribute('data-close');
                document.getElementById(modalId).classList.remove('active');
            });
        });
    }

    startTimer() {
        const timerEl = document.getElementById('timer');
        this.timerInterval = setInterval(() => {
            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                timerEl.textContent = "00:00";
                alert("Temps écoulé ! Le système a réinitialisé le dossier d'Alex.");
                return;
            }
            this.timeRemaining--;
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }

    loadScene(sceneId) {
        const scene = this.scenes[sceneId];
        if (!scene) return;

        this.currentSceneId = sceneId;
        document.getElementById('scene-title').textContent = scene.title;
        document.getElementById('scene-description').textContent = scene.description;
        
        const imgEl = document.getElementById('scene-image');
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgEl.src = scene.image;
            imgEl.style.opacity = 1;
        }, 150);

        const hotspotsLayer = document.getElementById('hotspots-layer');
        hotspotsLayer.innerHTML = '';

        scene.hotspots.forEach(spot => {
            const btn = document.createElement('button');
            btn.className = `hotspot type-${spot.type}`;
            btn.style.left = `${spot.x}%`;
            btn.style.top = `${spot.y}%`;

            let icon = spot.icon;
            if (spot.type === 'locked_move' && this.unlockedDoors[spot.lockId]) {
                icon = "🚪";
            }

            btn.innerHTML = `<span class="hotspot-icon">${icon}</span> <span>${spot.label}</span>`;
            btn.addEventListener('click', () => this.handleHotspotClick(spot));
            hotspotsLayer.appendChild(btn);
        });
    }

    handleHotspotClick(spot) {
        if (spot.type === 'move') {
            this.loadScene(spot.target);
        } 
        else if (spot.type === 'locked_move') {
            if (this.unlockedDoors[spot.lockId]) {
                this.loadScene(spot.target);
            } else {
                this.openLockPuzzle(spot.lockId, spot.target);
            }
        } 
        else if (spot.type === 'inspect' || spot.type === 'puzzle') {
            this.openPuzzle(spot.puzzleId);
        }
    }

    openLockPuzzle(lockId, targetScene) {
        const modal = document.getElementById('modal-puzzle');
        const title = document.getElementById('puzzle-title');
        const body = document.getElementById('puzzle-body');
        const feedback = document.getElementById('puzzle-feedback');
        feedback.textContent = "";

        title.textContent = "🔒 ACCÈS VERROUILLÉ — DIGICODE AMPHITHÉÂTRE";
        body.innerHTML = `
            <p>Un pavé numérique bloque l'ouverture des doubles portes. Il faut un code à 4 chiffres.</p>
            <div class="code-input-group">
                <input type="text" id="digicode-input" class="code-input" maxlength="4" placeholder="0000">
                <button id="btn-validate-code" class="hud-btn">Valider</button>
            </div>
        `;

        modal.classList.add('active');

        document.getElementById('btn-validate-code').addEventListener('click', () => {
            const val = document.getElementById('digicode-input').value.trim();
            if (val === "1926") {
                this.unlockedDoors[lockId] = true;
                feedback.style.color = "#00A88F";
                feedback.textContent = "✅ Code valide ! Les portes de l'amphithéâtre s'ouvrent.";
                setTimeout(() => {
                    modal.classList.remove('active');
                    this.loadScene(targetScene);
                }, 1000);
            } else {
                feedback.style.color = "#ff5e5e";
                feedback.textContent = "❌ Code incorrect. Cherche un indice dans le foyer.";
            }
        });
    }

    openPuzzle(puzzleId) {
        const modal = document.getElementById('modal-puzzle');
        const title = document.getElementById('puzzle-title');
        const body = document.getElementById('puzzle-body');
        const feedback = document.getElementById('puzzle-feedback');
        feedback.textContent = "";

        if (puzzleId === "indice_chevalet") {
            title.textContent = "🔍 Affiche sur le chevalet";
            body.innerHTML = `
                <p>Derrière l'affiche promotionnelle, un post-it manuscrit :</p>
                <blockquote class="alex-quote">
                    « Pour entrer dans l'amphi, souviens-toi de la logique : Prends les deux chiffres de l'affiche <strong>98 %</strong> de l'entrée, fais 9 - 8 = <strong>1</strong>, ajoute <strong>9</strong>, et termine par l'année actuelle (<strong>26</strong>). »<br><br>
                    <em>Code :</em> <strong>1 - 9 - 2 - 6</strong>.
                </blockquote>
            `;
        }
        else if (puzzleId === "boite_retour") {
            title.textContent = "📦 Boîte de retour des prêts";
            body.innerHTML = `
                <p>À l'intérieur de la boîte de dépôt, un rapport oublié mentionne l'emprunt d'un livre par Alex Morgan.</p>
            `;
        }
        else if (puzzleId === "borne_tactile") {
            title.textContent = "🖥️ Borne tactile de la Bibliothèque";
            body.innerHTML = `
                <p>L'écran tactile liste les horaires. <em>« La vérité suit l'ordre des cours de l'emploi du temps. »</em></p>
            `;
        }
        else if (puzzleId === "epreuve_1") {
            title.textContent = "📂 ÉPREUVE 1 — THE IDENTITY GLITCH";
            body.innerHTML = `
                <p>Tu trouves 4 dossiers d'étudiants sur le pupitre. Désigne le faux dossier :</p>
                <div class="files-grid">
                    <div class="student-card">
                        <h3>Dossier #1 — Chloé Bernard</h3>
                        <ul>
                            <li>ID : NEO-2026-441</li>
                            <li>Mardi 10h00 : Corporate Finance</li>
                        </ul>
                        <button class="suspect-btn" data-suspect="chloe">Dénoncer</button>
                    </div>
                    <div class="student-card">
                        <h3>Dossier #2 — Lucas Vance</h3>
                        <ul>
                            <li>ID : NEO-2026-892 (Valide au 31/02/2026)</li>
                            <li>Jeudi 09h00 : Conflit de salle</li>
                        </ul>
                        <button class="suspect-btn" data-suspect="lucas">Dénoncer</button>
                    </div>
                    <div class="student-card">
                        <h3>Dossier #3 — Inès El Amrani</h3>
                        <ul>
                            <li>ID : NEO-2026-119</li>
                            <li>Mercredi 11h00 : Supply Chain</li>
                        </ul>
                        <button class="suspect-btn" data-suspect="ines">Dénoncer</button>
                    </div>
                    <div class="student-card">
                        <h3>Dossier #4 — Alex Morgan</h3>
                        <ul>
                            <li>ID : NEO-2026-001 (SUPPRIMÉ)</li>
                        </ul>
                        <button class="suspect-btn" data-suspect="alex">Dénoncer</button>
                    </div>
                </div>
            `;

            modal.classList.add('active');

            document.querySelectorAll('.suspect-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const choice = e.target.getAttribute('data-suspect');
                    if (choice === "lucas") {
                        feedback.style.color = "#00A88F";
                        feedback.innerHTML = "✅ BRAVO ! Faux dossier identifié.<br><strong>Tu récupères la Preuve #1 et la Carte Transparente !</strong>";
                        this.addEvidence("Preuve #1 : Faux dossier de Lucas Vance + Carte Transparente.");
                    } else {
                        feedback.style.color = "#ff5e5e";
                        feedback.textContent = "❌ Ce dossier est valide.";
                    }
                });
            });
            return;
        }
        else if (puzzleId === "epreuve_2") {
            title.textContent = "🗺️ ÉPREUVE 2 — THE INVISIBLE CAMPUS";
            body.innerHTML = `
                <p>Entre les étagères de livres, un plan simplifié du campus. Sélectionne l'ordre des 3 lieux à visiter selon les horaires :</p>
                <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
                    <select id="seq-1" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">1er lieu...</option>
                        <option value="biblio">La Bibliothèque (Zone des livres)</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria / Foyer</option>
                    </select>
                    <select id="seq-2" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">2e lieu...</option>
                        <option value="biblio">La Bibliothèque (Zone des livres)</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria / Foyer</option>
                    </select>
                    <select id="seq-3" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">3e lieu...</option>
                        <option value="biblio">La Bibliothèque (Zone des livres)</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria / Foyer</option>
                    </select>
                    <button id="btn-validate-ep2" class="action-btn">Vérifier la combinaison</button>
                </div>
            `;

            modal.classList.add('active');

            document.getElementById('btn-validate-ep2').addEventListener('click', () => {
                const s1 = document.getElementById('seq-1').value;
                const s2 = document.getElementById('seq-2').value;
                const s3 = document.getElementById('seq-3').value;

                if (s1 === "amphi" && s2 === "biblio" && s3 === "cafet") {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = "✅ Excellent !<br><strong>Tu récupères la Preuve #2 : Fragments de message !</strong>";
                    this.addEvidence("Preuve #2 : Fragments de message de l'Invisible Campus.");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Mauvais ordre. Indice : Amphi -> Bibliothèque -> Cafet.";
                }
            });
            return;
        }

        modal.classList.add('active');
    }

    addEvidence(evidenceText) {
        if (!this.inventory.includes(evidenceText)) {
            this.inventory.push(evidenceText);
            const count = Math.min(this.inventory.length, 5);
            document.getElementById('evidence-count').textContent = count;
        }
    }

    renderInventory() {
        const listEl = document.getElementById('inventory-list');
        if (this.inventory.length === 0) {
            listEl.innerHTML = '<p class="empty-msg">Aucune preuve récoltée pour le moment.</p>';
            return;
        }
        listEl.innerHTML = this.inventory.map(item => `<div class="evidence-item">✅ ${item}</div>`).join('');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new EscapeGame();
});
