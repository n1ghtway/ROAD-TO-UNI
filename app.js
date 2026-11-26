class EscapeGame {
    constructor() {
        this.scenes = {};
        this.currentSceneId = null;
        this.inventory = [];
        this.unlockedDoors = {}; // Stocke les portes déverrouillées
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

            // Si la porte est déjà déverrouillée, on change l'icône
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

    // --- GESTION DU DIGICODE DE L'AMPHI ---
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
                feedback.textContent = "✅ Code valide ! Les portes de l'amphithéâtre se déverrouillent.";
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

    // --- GESTION DES INDICES ET DES 5 ÉPREUVES ---
    openPuzzle(puzzleId) {
        const modal = document.getElementById('modal-puzzle');
        const title = document.getElementById('puzzle-title');
        const body = document.getElementById('puzzle-body');
        const feedback = document.getElementById('puzzle-feedback');
        feedback.textContent = "";

        if (puzzleId === "indice_chevalet") {
            title.textContent = "🔍 Affiche sur le chevalet";
            body.innerHTML = `
                <p>Derrière l'affiche promotionnelle, quelqu'un a scotché un post-it avec une note manuscrite :</p>
                <blockquote class="alex-quote">
                    « Pour entrer dans l'amphi, souviens-toi de la logique : Prends les deux chiffres de l'affiche <strong>98 %</strong> de l'entrée, divise le deuxième par le premier (8 / 9 ? Non, lis à l'envers : 9 - 8 = <strong>1</strong>), puis ajoute <strong>9</strong>, et termine par l'année actuelle (<strong>26</strong>). »<br><br>
                    <em>Note gribouillée en bas :</em> <strong>1 - 9 - 2 - 6</strong>.
                </blockquote>
            `;
        }
        else if (puzzleId === "ecran_amphi") {
            title.textContent = "🖥️ Écran de contrôle de l'amphithéâtre";
            body.innerHTML = `
                <p>L'écran de projection est éteint, mais un terminal de maintenance affiche encore un journal système :</p>
                <blockquote class="alex-quote">
                    [SYSTEM LOG] : Dernière impression lancée depuis ce pupitre à 14h12.<br>
                    Documents imprimés : 4 fiches étudiants (Programme PGE).<br>
                    Statut : Un fichier contient des métadonnées corrompues.
                </blockquote>
            `;
        }
        else if (puzzleId === "epreuve_1") {
            title.textContent = "📂 ÉPREUVE 1 — THE IDENTITY GLITCH";
            body.innerHTML = `
                <p>Tu trouves 4 dossiers d'étudiants sur le pupitre. L'un d'eux a été falsifié à la hâte. Repère les anomalies (horaire impossible, date de badge invalide, signature incohérente) et désigne le faux dossier :</p>
                <div class="files-grid">
                    <div class="student-card">
                        <h3>Dossier #1 — Chloé Bernard</h3>
                        <ul>
                            <li><strong>ID Badge :</strong> NEO-2026-441 (Valide jusqu'au 30/09/2027)</li>
                            <li><strong>Mardi 10h00 :</strong> Corporate Finance (Salle B204)</li>
                            <li><strong>Mardi 14h00 :</strong> Marketing Strategy (Amphi A)</li>
                            <li><strong>Signature :</strong> <em>C. Bernard</em></li>
                        </ul>
                        <button class="suspect-btn" data-suspect="chloe">Dénoncer ce dossier</button>
                    </div>

                    <div class="student-card">
                        <h3>Dossier #2 — Lucas Vance</h3>
                        <ul>
                            <li><strong>ID Badge :</strong> NEO-2026-892 (Valide jusqu'au 31/02/2026)</li>
                            <li><strong>Jeudi 09h00 :</strong> Data Analytics (Salle C102 & Salle A04)</li>
                            <li><strong>Jeudi 14h00 :</strong> Business Law (Amphi B)</li>
                            <li><strong>Signature :</strong> <em>A. Morgan</em> (raturé)</li>
                        </ul>
                        <button class="suspect-btn" data-suspect="lucas">Dénoncer ce dossier</button>
                    </div>

                    <div class="student-card">
                        <h3>Dossier #3 — Inès El Amrani</h3>
                        <ul>
                            <li><strong>ID Badge :</strong> NEO-2026-119 (Valide jusqu'au 30/09/2027)</li>
                            <li><strong>Mercredi 11h00 :</strong> Supply Chain (Salle D301)</li>
                            <li><strong>Mercredi 15h30 :</strong> Leadership (Salle B105)</li>
                            <li><strong>Signature :</strong> <em>Inès E.A.</em></li>
                        </ul>
                        <button class="suspect-btn" data-suspect="ines">Dénoncer ce dossier</button>
                    </div>

                    <div class="student-card">
                        <h3>Dossier #4 — Alex Morgan</h3>
                        <ul>
                            <li><strong>ID Badge :</strong> NEO-2026-001 (Statut : SUPPRIMÉ)</li>
                            <li><strong>Lundi 08h30 :</strong> Cybersecurity Lab (Salle Info 2)</li>
                            <li><strong>Vendredi 16h00 :</strong> Audit & Control (Amphi A)</li>
                            <li><strong>Signature :</strong> <em>Alex Morgan</em></li>
                        </ul>
                        <button class="suspect-btn" data-suspect="alex">Dénoncer ce dossier</button>
                    </div>
                </div>
            `;

            modal.classList.add('active');

            document.querySelectorAll('.suspect-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const choice = e.target.getAttribute('data-suspect');
                    if (choice === "lucas") {
                        feedback.style.color = "#00A88F";
                        feedback.innerHTML = "✅ BRAVO ! Le dossier de Lucas Vance est un faux (31 février n'existe pas, cours dans deux salles en même temps à 9h, et signature d'Alex raturée).<br><strong>Tu récupères la Preuve #1 et une Carte Transparente de décodage !</strong>";
                        this.addEvidence("Preuve #1 : Faux dossier de Lucas Vance + Carte Transparente (révèle des symboles cachés sur le plan du campus).");
                    } else {
                        feedback.style.color = "#ff5e5e";
                        feedback.textContent = "❌ Ce dossier semble tout à fait légitime. Vérifie bien les dates, les salles et les signatures !";
                    }
                });
            });
            return;
        }

        modal.classList.add('active');
    }

    addEvidence(evidenceText) {
        if (!this.inventory.includes(evidenceText)) {
            this.inventory.push(evidenceText);
            // Met à jour le compteur (on limite l'affichage à 5 preuves max)
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
