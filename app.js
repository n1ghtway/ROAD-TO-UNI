class EscapeGame {
    constructor() {
        this.scenes = {};
        this.currentSceneId = null;
        this.inventory = [];
        this.unlockedDoors = {};
        this.timeRemaining = 35 * 60;
        this.timerInterval = null;

        this.init();
    }

    async init() {
        try {
            const response = await fetch('scenes.json');
            const data = await response.json();
            this.scenes = data.scenes;

            this.setupUI();
            this.startTimer();
            this.loadScene(data.startScene);

            document.getElementById('modal-briefing').classList.add('active');
        } catch (error) {
            console.error("Erreur :", error);
            document.getElementById('scene-description').textContent = 
                "Erreur : impossible de charger scenes.json. Utilise un serveur local.";
        }
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
                <p>À l'intérieur de la boîte de dépôt, un rapport oublié mentionne l'emprunt d'un livre de cryptographie par Alex Morgan, avec un signet marquant la page 42.</p>
            `;
        }
        else if (puzzleId === "borne_tactile") {
            title.textContent = "🖥️ Borne tactile de la Bibliothèque";
            body.innerHTML = `
                <p>L'écran tactile liste les horaires d'ouverture des salles de réunion secrètes du campus. Un message clignote : <em>« La vérité suit l'ordre des cours de l'emploi du temps. »</em></p>
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
                <p>Entre les étagères de livres, un plan simplifié du campus est affiché. Pour révéler les 3 lieux secrets d'Alex, tu dois superposer la <strong>Carte Transparente</strong> (obtenue à l'épreuve 1).</p>
                <p>Sélectionne l'ordre des 3 lieux à visiter selon les horaires de l'emploi du temps :</p>
                <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
                    <select id="seq-1" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">1er lieu révélé par le calque...</option>
                        <option value="biblio">La Bibliothèque (Zone des livres)</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria / Foyer</option>
                    </select>
                    <select id="seq-2" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">2e lieu révélé par le calque...</option>
                        <option value="biblio">La Bibliothèque (Zone des livres)</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria / Foyer</option>
                    </select>
                    <select id="seq-3" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">3e lieu révélé par le calque...</option>
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
                    feedback.innerHTML = "✅ Excellent ! Grâce au calque et aux horaires, tu as découvert les 3 fragments de message cachés.<br><strong>Tu récupères la Preuve #2 : Fragment décodé de l'Invisible Campus !</strong>";
                    this.addEvidence("Preuve #2 : Fragments de message de l'Invisible Campus.");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Mauvais ordre ou mauvais lieux. Aide-toi des horaires des dossiers ! (Indice : Amphi -> Bibliothèque -> Cafet).";
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
