class EscapeGame {
    constructor() {
        this.scenes = {
            "entree": {
                "title": "Hall d'entrée — La Passerelle",
                "image": "Entry-front_door.png",
                "description": "Point de départ sur la passerelle de NEOMA. Cinq preuves sont cachées sur le campus.",
                "hotspots": [
                    { "type": "move", "label": "Vers le couloir central", "icon": "⬆️", "x": 50, "y": 48, "target": "corridor_choice" },
                    { "type": "move", "label": "Descendre les escaliers", "icon": "↙️", "x": 18, "y": 78, "target": "entree_downstairs" },
                    { "type": "move", "label": "Vers l'amphithéâtre", "icon": "➡️", "x": 85, "y": 65, "target": "amphi_hall" }
                ]
            },
            "amphi_hall": {
                "title": "Foyer de l'Amphithéâtre",
                "image": "Amphitheatre_outside.jpeg",
                "description": "Devant les doubles portes de l'amphi. Un digicode protège l'entrée.",
                "hotspots": [
                    { "type": "inspect", "label": "Examiner le chevalet", "icon": "🔍", "x": 46, "y": 62, "puzzleId": "indice_chevalet" },
                    { "type": "locked_move", "label": "Porte Gauche", "icon": "🔒", "x": 17, "y": 44, "target": "amphitheatre", "lockId": "porte_amphi" },
                    { "type": "locked_move", "label": "Porte Droite", "icon": "🔒", "x": 72, "y": 45, "target": "amphitheatre", "lockId": "porte_amphi" },
                    { "type": "move", "label": "Retour à l'entrée", "icon": "⬇️", "x": 50, "y": 86, "target": "entree" }
                ]
            },
            "amphitheatre": {
                "title": "Grand Amphithéâtre",
                "image": "Amphitheatre.jpeg",
                "description": "Amphithéâtre en gradins. Des dossiers sont disposés sur le pupitre de conférence.",
                "hotspots": [
                    { "type": "puzzle", "label": "Épreuve 1 : Inspecter le pupitre", "icon": "📂", "x": 86, "y": 62, "puzzleId": "epreuve_1" },
                    { "type": "move", "label": "Sortir vers le foyer", "icon": "⬅️", "x": 29, "y": 24, "target": "amphi_hall" }
                ]
            },
            "entree_downstairs": {
                "title": "Rez-de-chaussée — Espace Accueil",
                "image": "entry_downstrairs.jpeg",
                "description": "En bas des escaliers, face aux portes vitrées de la bibliothèque.",
                "hotspots": [
                    { "type": "move", "label": "Entrer dans la Bibliothèque", "icon": "🚪", "x": 88, "y": 50, "target": "library_left" },
                    { "type": "inspect", "label": "Boîte de retour de prêts", "icon": "📦", "x": 76, "y": 55, "puzzleId": "boite_retour" },
                    { "type": "move", "label": "Remonter à la passerelle", "icon": "↗️", "x": 15, "y": 25, "target": "entree" }
                ]
            },
            "library_left": {
                "title": "Bibliothèque — Espace Travail",
                "image": "Library-left_side-desks.png",
                "description": "Tables de travail et bornes de recharge.",
                "hotspots": [
                    { "type": "move", "label": "Vers les rayonnages", "icon": "➡️", "x": 85, "y": 50, "target": "library_right" },
                    { "type": "inspect", "label": "Borne tactile", "icon": "🖥️", "x": 90, "y": 78, "puzzleId": "borne_tactile" },
                    { "type": "move", "label": "Sortir de la bibliothèque", "icon": "⬅️", "x": 12, "y": 50, "target": "entree_downstairs" }
                ]
            },
            "library_right": {
                "title": "Bibliothèque — Allée des Rayonnages",
                "image": "Library-right_side-bookshelves.jpeg",
                "description": "Allées de livres. Un plan du campus est affiché ici.",
                "hotspots": [
                    { "type": "puzzle", "label": "Épreuve 2 : Le Plan Invisible", "icon": "🗺️", "x": 55, "y": 42, "puzzleId": "epreuve_2" },
                    { "type": "move", "label": "Retour aux tables", "icon": "⬅️", "x": 15, "y": 50, "target": "library_left" }
                ]
            },
            "corridor_choice": {
                "title": "Carrefour du Couloir Principal",
                "image": "corridor-choice_cafeteria_or_direction_stairs_alumni-classroom.jpeg",
                "description": "Le mur des Alumni. À gauche se trouve la cafétéria, tout droit la suite du bâtiment.",
                "hotspots": [
                    { "type": "move", "label": "Vers la Cafétéria", "icon": "⬅️", "x": 18, "y": 48, "target": "cafeteria" },
                    { "type": "move", "label": "Continuer dans le couloir", "icon": "⬆️", "x": 81, "y": 50, "target": "corridor_ext" },
                    { "type": "move", "label": "Retour à l'entrée", "icon": "⬇️", "x": 50, "y": 86, "target": "entree" }
                ]
            },
            "cafeteria": {
                "title": "La Cafétéria / Neo Café",
                "image": "Cafeteria.jpeg",
                "description": "Espace de détente et de restauration. Un message codé est affiché sur le panneau.",
                "hotspots": [
                    { "type": "puzzle", "label": "Épreuve 3 : La Transmission", "icon": "📡", "x": 54, "y": 40, "puzzleId": "epreuve_3" },
                    { "type": "move", "label": "Retour au carrefour", "icon": "⬇️", "x": 50, "y": 86, "target": "corridor_choice" }
                ]
            },
            "corridor_ext": {
                "title": "Couloir de transition",
                "image": "Corridor-direction_exterior_and_alumni_and_classroom.jpeg",
                "description": "Un couloir calme de NEOMA. La sortie extérieure est à gauche, et les escaliers centraux au fond.",
                "hotspots": [
                    { "type": "move", "label": "Vers la sortie extérieure", "icon": "🚪", "x": 10, "y": 50, "target": "exterior_door" },
                    { "type": "move", "label": "Vers les escaliers", "icon": "🔀", "x": 22, "y": 50, "target": "stairs_central" },
                    { "type": "inspect", "label": "Lire le panneau d'affichage", "icon": "📌", "x": 82, "y": 38, "puzzleId": "anecdote_neoma" },
                    { "type": "move", "label": "Retour au carrefour", "icon": "⬇️", "x": 50, "y": 86, "target": "corridor_choice" }
                ]
            },
            "stairs_central": {
                "title": "Cage d'Escalier Centrale",
                "image": "dowstrairs_alumni-upstairs_classroom.jpeg",
                "description": "Tu peux monter vers les salles de classe ou descendre vers le pôle Alumni et informatique.",
                "hotspots": [
                    { "type": "move", "label": "Monter vers les salles de classe", "icon": "⬆️", "x": 49, "y": 46, "target": "classroom" },
                    { "type": "move", "label": "Descendre vers le Pôle IT & Alumni", "icon": "⬇️", "x": 35, "y": 62, "target": "downstairs_it" },
                    { "type": "move", "label": "Retour au couloir", "icon": "⬅️", "x": 15, "y": 80, "target": "corridor_ext" }
                ]
            },
            "classroom": {
                "title": "Salle de Classe (Étage)",
                "image": "classroom.jpeg",
                "description": "Une salle de cours vide. Des notes sont restées au tableau.",
                "hotspots": [
                    { "type": "inspect", "label": "Inspecter le tableau", "icon": "📝", "x": 10, "y": 48, "puzzleId": "salle_cours" },
                    { "type": "move", "label": "Redescendre aux escaliers", "icon": "⬇️", "x": 50, "y": 86, "target": "stairs_central" }
                ]
            },
            "downstairs_it": {
                "title": "Pôle Alumni & Informatique",
                "image": "downstrairs-choice_alumni-choice_IT.jpeg",
                "description": "Les vitrines de trophées. Le couloir sur la gauche mène directement au service informatique.",
                "hotspots": [
                    { "type": "move", "label": "Aller vers la Salle IT (Gauche)", "icon": "⬅️", "x": 22, "y": 48, "target": "it_room" },
                    { "type": "move", "label": "Remonter aux escaliers", "icon": "⬆️", "x": 50, "y": 86, "target": "stairs_central" }
                ]
            },
            "it_room": {
                "title": "Salle Informatique / Service Technique",
                "image": "IT-room.jpeg",
                "description": "Les écrans de contrôle et les serveurs du campus. C'est ici que les dossiers sont gérés.",
                "hotspots": [
                    { "type": "puzzle", "label": "Épreuve 4 : L'Emploi du temps", "icon": "⏱️", "x": 45, "y": 42, "puzzleId": "epreuve_4" },
                    { "type": "move", "label": "Sortir vers le couloir", "icon": "⬇️", "x": 50, "y": 86, "target": "downstairs_it" }
                ]
            },
            "exterior_door": {
                "title": "Hall de Sortie Extérieure",
                "image": "exterior-door.jpeg",
                "description": "Les grandes portes vitrées donnent directement sur la terrasse extérieure.",
                "hotspots": [
                    { "type": "move", "label": "Sortir sur la Terrasse", "icon": "☀️", "x": 50, "y": 50, "target": "exterior_upstairs" },
                    { "type": "move", "label": "Retour dans le couloir", "icon": "⬇️", "x": 50, "y": 86, "target": "corridor_ext" }
                ]
            },
            "exterior_upstairs": {
                "title": "Terrasse Extérieure Haute",
                "image": "exterior-upstairs.jpeg",
                "description": "Tu es sur la terrasse supérieure. Sur la droite, un escalier descend vers la cour basse.",
                "hotspots": [
                    { "type": "move", "label": "Descendre les escaliers", "icon": "↘️", "x": 83, "y": 62, "target": "exterior_downstairs" },
                    { "type": "move", "label": "Rentrer dans le bâtiment", "icon": "🚪", "x": 28, "y": 52, "target": "exterior_door" }
                ]
            },
            "exterior_downstairs": {
                "title": "Cour Extérieure Basse",
                "image": "Exterior-downstairs.jpeg",
                "description": "La cour basse avec les tables et la table de Teqball. Si tu as toutes les preuves, tu peux conclure l'enquête ici.",
                "hotspots": [
                    { "type": "puzzle", "label": "Épreuve 5 : Accusation Finale", "icon": "⚖️", "x": 42, "y": 62, "puzzleId": "epreuve_5" },
                    { "type": "move", "label": "Remonter sur la terrasse", "icon": "↗️", "x": 85, "y": 55, "target": "exterior_upstairs" }
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
            <p>Un pavé numérique bloque l'accès à l'amphi. Entre le code à 4 chiffres (Indice sur le chevalet du foyer : 1-9-2-6).</p>
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
                feedback.textContent = "✅ Code valide ! Les portes s'ouvrent.";
                setTimeout(() => {
                    modal.classList.remove('active');
                    this.loadScene(targetScene);
                }, 1000);
            } else {
                feedback.style.color = "#ff5e5e";
                feedback.textContent = "❌ Code incorrect.";
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
                <p>Post-it de l'entrée :</p>
                <blockquote class="alex-quote">
                    « Prends les chiffres de l'affiche <strong>98 %</strong>, fais 9 - 8 = <strong>1</strong>, ajoute <strong>9</strong>, et termine par l'année <strong>26</strong>. Code : <strong>1926</strong>. »
                </blockquote>
            `;
        }
        else if (puzzleId === "anecdote_neoma") {
            title.textContent = "📌 Panneau d'affichage — Le Saviez-vous ?";
            body.innerHTML = `
                <p>Un vieux flyer punaisé sur le panneau raconte une anecdote sur NEOMA :</p>
                <blockquote class="alex-quote">
                    « Le sais-tu ? Le campus de NEOMA organise chaque année des défis d'intégration légendaires où les étudiants doivent résoudre des énigmes grandeur nature à travers tous les bâtiments. Certains disent que les meilleurs détectives finissent par intégrer une société secrète étudiante... »
                </blockquote>
                <p style="text-align:center; color: #00A88F; margin-top:10px;">(anecdote validée 🎯 Aucune incidence sur l'enquête, juste pour le fun !)</p>
            `;
        }
        else if (puzzleId === "boite_retour") {
            title.textContent = "📦 Boîte de retour des prêts";
            body.innerHTML = `<p>Rapport d'emprunt d'Alex Morgan marqué à la page 42.</p>`;
        }
        else if (puzzleId === "borne_tactile") {
            title.textContent = "🖥️ Borne tactile";
            body.innerHTML = `<p>« La vérité suit l'ordre des cours de l'emploi du temps. »</p>`;
        }
        else if (puzzleId === "salle_cours") {
            title.textContent = "📝 Tableau de classe";
            body.innerHTML = `<p>Des calculs de cryptographie effacés à moitié : <em>Dernière modification système : 14:12</em>.</p>`;
        }
        else if (puzzleId === "epreuve_1") {
            title.textContent = "📂 ÉPREUVE 1 — THE IDENTITY GLITCH";
            body.innerHTML = `
                <p>Désigne le faux dossier parmi les 4 étudiants :</p>
                <div class="files-grid">
                    <div class="student-card">
                        <h3>Chloé Bernard</h3>
                        <p>ID: NEO-2026-441 (Valide)</p>
                        <button class="suspect-btn" data-suspect="chloe">Dénoncer</button>
                    </div>
                    <div class="student-card">
                        <h3>Lucas Vance</h3>
                        <p>ID: NEO-2026-892 (Valide au 31/02/2026 - Conflit salle)</p>
                        <button class="suspect-btn" data-suspect="lucas">Dénoncer</button>
                    </div>
                    <div class="student-card">
                        <h3>Inès El Amrani</h3>
                        <p>ID: NEO-2026-119 (Valide)</p>
                        <button class="suspect-btn" data-suspect="ines">Dénoncer</button>
                    </div>
                    <div class="student-card">
                        <h3>Alex Morgan</h3>
                        <p>ID: SUPPRIMÉ</p>
                        <button class="suspect-btn" data-suspect="alex">Dénoncer</button>
                    </div>
                </div>
            `;
            modal.classList.add('active');
            document.querySelectorAll('.suspect-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-suspect') === "lucas") {
                        feedback.style.color = "#00A88F";
                        feedback.innerHTML = "✅ Bravo ! Preuve #1 validée : Faux dossier de Lucas Vance + Carte Transparente.";
                        this.addEvidence("Preuve #1 : Faux dossier de Lucas Vance & Carte Transparente.");
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
                <p>Classe les 3 lieux découverts avec la carte transparente selon les horaires :</p>
                <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
                    <select id="seq-1" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">1er lieu...</option>
                        <option value="biblio">La Bibliothèque</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria</option>
                    </select>
                    <select id="seq-2" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">2e lieu...</option>
                        <option value="biblio">La Bibliothèque</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria</option>
                    </select>
                    <select id="seq-3" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">3e lieu...</option>
                        <option value="biblio">La Bibliothèque</option>
                        <option value="amphi">L'Amphithéâtre</option>
                        <option value="cafet">La Cafétéria</option>
                    </select>
                    <button id="btn-validate-ep2" class="action-btn">Valider</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep2').addEventListener('click', () => {
                if (document.getElementById('seq-1').value === "amphi" && 
                    document.getElementById('seq-2').value === "biblio" && 
                    document.getElementById('seq-3').value === "cafet") {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = "✅ Preuve #2 validée : Fragments de l'Invisible Campus.";
                    this.addEvidence("Preuve #2 : Fragments de l'Invisible Campus.");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Ordre incorrect (Indice : Amphi -> Bibliothèque -> Cafet).";
                }
            });
            return;
        }
        else if (puzzleId === "epreuve_3") {
            title.textContent = "📡 ÉPREUVE 3 — THE BROKEN TRANSMISSION";
            body.innerHTML = `
                <p>Message codé intercepté à la cafétéria. Entre la phrase clé révélée par la communication (Indice : <em>The truth is hidden in the schedule</em>) :</p>
                <div class="code-input-group">
                    <input type="text" id="trans-input" class="code-input" style="letter-spacing: 2px; font-size: 1rem;" placeholder="Phrase secrète...">
                    <button id="btn-validate-ep3" class="hud-btn">Valider</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep3').addEventListener('click', () => {
                if (document.getElementById('trans-input').value.toLowerCase().includes("truth is hidden")) {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = "✅ Preuve #3 validée : Transmission décodée (« The truth is hidden in the schedule »).";
                    this.addEvidence("Preuve #3 : Transmission décodée.");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Message incorrect.";
                }
            });
            return;
        }
        else if (puzzleId === "epreuve_4") {
            title.textContent = "⏱️ ÉPREUVE 4 — THE IMPOSSIBLE TIMETABLE";
            body.innerHTML = `
                <p>Quel est l'horaire exact de modification du dossier d'Alex sur les serveurs ? (Format HH:MM, indice dans la salle de classe)</p>
                <div class="code-input-group">
                    <input type="text" id="time-input" class="code-input" maxlength="5" placeholder="14:12">
                    <button id="btn-validate-ep4" class="hud-btn">Valider</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep4').addEventListener('click', () => {
                if (document.getElementById('time-input').value.trim() === "14:12") {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = "✅ Preuve #4 validée : Heure de suppression confirmée (14:12).";
                    this.addEvidence("Preuve #4 : Heure de suppression du dossier (14:12).");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Heure incorrecte.";
                }
            });
            return;
        }
        else if (puzzleId === "epreuve_5") {
            title.textContent = "⚖️ ÉPREUVE 5 — THE FINAL ACCUSATION";
            body.innerHTML = `
                <p>Désigne le responsable final et valide l'enquête :</p>
                <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                    <select id="acc-suspect" class="code-input" style="font-size:1rem; letter-spacing:normal;">
                        <option value="">Coupable...</option>
                        <option value="alex">Alex Morgan (Lui-même)</option>
                        <option value="it">Le responsable informatique</option>
                        <option value="tuteur">Le tuteur étudiant</option>
                    </select>
                    <button id="btn-validate-ep5" class="action-btn">Conclure l'enquête</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep5').addEventListener('click', () => {
                if (document.getElementById('acc-suspect').value === "alex") {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = `
                        <h2>🏆 CASE CLOSED — BUT YOUR FILE IS STILL OPEN</h2>
                        <p>« You spent 30 minutes looking for a missing student. But the real mystery was never about Alex. It was about whether you could work together. Welcome to NEOMA. »</p>
                        <p><strong>Badge de Campus Investigator débloqué ! Félicitations ! 🎉</strong></p>
                    `;
                    this.addEvidence("Preuve #5 : Dossier Final Résolu + Badge Campus Investigator.");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Ce n'est pas le bon suspect.";
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
