class EscapeGame {
    constructor() {
        this.scenes = {
            "entree": {
                "title": "Main Entrance — The Gateway",
                "image": "Entry-front_door.png",
                "description": "You arrive at the NEOMA gateway. A campus security guard sips lukewarm coffee while humming a techno beat. 'Looking for Alex? Good luck, the 2nd-floor coffee machine swallowed their student ID card three days ago.'",
                "hotspots": [
                    { "type": "move", "label": "To the central corridor", "icon": "⬆️", "x": 50, "y": 48, "target": "corridor_choice" },
                    { "type": "move", "label": "Go downstairs", "icon": "↙️", "x": 18, "y": 78, "target": "entree_downstairs" },
                    { "type": "move", "label": "To the amphitheatre", "icon": "➡️", "x": 85, "y": 65, "target": "amphi_hall" },
                    { "type": "inspect", "label": "Inspect green plant", "icon": "🌿", "x": 12, "y": 60, "puzzleId": "plante_verte" },
                    { "type": "inspect", "label": "Guard's suspicious mug", "icon": "☕", "x": 35, "y": 70, "puzzleId": "tasse_cafe_1" }
                ]
            },
            "amphi_hall": {
                "title": "Amphitheatre Foyer",
                "image": "Amphitheatre_outside.jpeg",
                "description": "In front of the double doors. A group of students is passionately debating whether chocolate-filled pastries and regular ones share the same managerial weight.",
                "hotspots": [
                    { "type": "inspect", "label": "Examine easel", "icon": "🔍", "x": 46, "y": 62, "puzzleId": "indice_chevalet" },
                    { "type": "locked_move", "label": "Left Door", "icon": "🔒", "x": 17, "y": 44, "target": "amphitheatre", "lockId": "porte_amphi" },
                    { "type": "locked_move", "label": "Right Door", "icon": "🔒", "x": 72, "y": 45, "target": "amphitheatre", "lockId": "porte_amphi" },
                    { "type": "inspect", "label": "Abandoned cup", "icon": "☕", "x": 35, "y": 55, "puzzleId": "tasse_cafe_5" },
                    { "type": "move", "label": "Return to entrance", "icon": "⬇️", "x": 50, "y": 86, "target": "entree" }
                ]
            },
            "amphitheatre": {
                "title": "Grand Amphitheatre",
                "image": "Amphitheatre.jpeg",
                "description": "The echo of thousands of lectures still lingers. Student files are scattered across the conference desk.",
                "hotspots": [
                    { "type": "puzzle", "label": "Trial 1: Inspect the desk", "icon": "📂", "x": 86, "y": 62, "puzzleId": "epreuve_1" },
                    { "type": "inspect", "label": "Check seats", "icon": "💺", "x": 25, "y": 65, "puzzleId": "fauteuils_amphi" },
                    { "type": "move", "label": "Exit to foyer", "icon": "⬅️", "x": 29, "y": 24, "target": "amphi_hall" }
                ]
            },
            "entree_downstairs": {
                "title": "Ground Floor — Reception Area",
                "image": "entry_downstrairs.jpeg",
                "description": "At the bottom of the stairs, facing the glass library doors. A sign reads 'Caution: slippery floor, philosophical sliding hazard'.",
                "hotspots": [
                    { "type": "move", "label": "Enter the Library", "icon": "🚪", "x": 88, "y": 50, "target": "library_left" },
                    { "type": "inspect", "label": "Book return box", "icon": "📦", "x": 76, "y": 55, "puzzleId": "boite_retour" },
                    { "type": "inspect", "label": "Campus map", "icon": "🗺️", "x": 50, "y": 25, "puzzleId": "affiche_orientation" },
                    { "type": "move", "label": "Back to gateway", "icon": "↗️", "x": 15, "y": 25, "target": "entree" }
                ]
            },
            "library_left": {
                "title": "Library — Workspace",
                "image": "Library-left_side-desks.png",
                "description": "Silence rules here... broken only by the quiet snoring of a student at the end of the table.",
                "hotspots": [
                    { "type": "move", "label": "To the bookshelves", "icon": "➡️", "x": 85, "y": 50, "target": "library_right" },
                    { "type": "inspect", "label": "Touchscreen kiosk", "icon": "🖥️", "x": 90, "y": 78, "puzzleId": "borne_tactile" },
                    { "type": "inspect", "label": "Squeaky chair", "icon": "🪑", "x": 48, "y": 60, "puzzleId": "chaise_biblio" },
                    { "type": "move", "label": "Exit library", "icon": "⬅️", "x": 12, "y": 50, "target": "entree_downstairs" }
                ]
            },
            "library_right": {
                "title": "Library — Bookshelf Aisles",
                "image": "Library-right_side-bookshelves.jpeg",
                "description": "Endless rows of general accounting textbooks as far as the eye can see.",
                "hotspots": [
                    { "type": "puzzle", "label": "Trial 2: The Invisible Campus", "icon": "🗺️", "x": 55, "y": 42, "puzzleId": "epreuve_2" },
                    { "type": "inspect", "label": "Dusty book", "icon": "📖", "x": 75, "y": 55, "puzzleId": "livre_poussiererux" },
                    { "type": "move", "label": "Back to tables", "icon": "⬅️", "x": 15, "y": 50, "target": "library_left" }
                ]
            },
            "corridor_choice": {
                "title": "Main Corridor Crossroads",
                "image": "corridor-choice_cafeteria_or_direction_stairs_alumni-classroom.jpeg",
                "description": "The Alumni portrait wall. A student wonders: 'Does employment rate matter if you end up a rookie private investigator?'",
                "hotspots": [
                    { "type": "move", "label": "To the Cafeteria", "icon": "⬅️", "x": 18, "y": 48, "target": "cafeteria" },
                    { "type": "move", "label": "Continue down corridor", "icon": "⬆️", "x": 81, "y": 50, "target": "corridor_ext" },
                    { "type": "inspect", "label": "Look at portraits", "icon": "🖼️", "x": 30, "y": 45, "puzzleId": "portraits_alumni" },
                    { "type": "move", "label": "Return to entrance", "icon": "⬇️", "x": 50, "y": 86, "target": "entree" }
                ]
            },
            "cafeteria": {
                "title": "Cafeteria / Neo Café",
                "image": "Cafeteria.jpeg",
                "description": "Smells like warm panini and filtered coffee. A microwave is making jet-engine noises.",
                "hotspots": [
                    { "type": "puzzle", "label": "Trial 3: The Transmission", "icon": "📡", "x": 54, "y": 40, "puzzleId": "epreuve_3" },
                    { "type": "inspect", "label": "Stubborn vending machine", "icon": "🍫", "x": 15, "y": 45, "puzzleId": "distributeur" },
                    { "type": "inspect", "label": "Espresso machine mug", "icon": "☕", "x": 42, "y": 50, "puzzleId": "tasse_cafe_2" },
                    { "type": "move", "label": "Back to crossroads", "icon": "⬇️", "x": 50, "y": 86, "target": "corridor_choice" }
                ]
            },
            "corridor_ext": {
                "title": "Transition Corridor",
                "image": "Corridor-direction_exterior_and_alumni_and_classroom.jpeg",
                "description": "A long corridor. A prevention poster reminds students not to feed pigeons inside the amphitheatre.",
                "hotspots": [
                    { "type": "move", "label": "To outdoor exit", "icon": "🚪", "x": 10, "y": 50, "target": "exterior_door" },
                    { "type": "move", "label": "To the stairs", "icon": "🔀", "x": 22, "y": 50, "target": "stairs_central" },
                    { "type": "inspect", "label": "Read notice board", "icon": "📌", "x": 82, "y": 38, "puzzleId": "anecdote_neoma" },
                    { "type": "move", "label": "Back to crossroads", "icon": "⬇️", "x": 50, "y": 86, "target": "corridor_choice" }
                ]
            },
            "stairs_central": {
                "title": "Central Stairwell",
                "image": "dowstrairs_alumni-upstairs_classroom.jpeg",
                "description": "The vertigo of massive concrete structures. Someone wrote 'The gap year internship is a lie' in chalk on a step.",
                "hotspots": [
                    { "type": "move", "label": "Go up to classrooms", "icon": "⬆️", "x": 49, "y": 46, "target": "classroom" },
                    { "type": "move", "label": "Go down to IT & Alumni", "icon": "⬇️", "x": 35, "y": 62, "target": "downstairs_it" },
                    { "type": "inspect", "label": "Wall graffiti", "icon": "✍️", "x": 75, "y": 40, "puzzleId": "graffiti_escalier" },
                    { "type": "move", "label": "Back to corridor", "icon": "⬅️", "x": 15, "y": 80, "target": "corridor_ext" }
                ]
            },
            "classroom": {
                "title": "Classroom (Upper Floor)",
                "image": "classroom.jpeg",
                "description": "An empty classroom with meticulously aligned chairs. Feels like a dystopian sci-fi movie.",
                "hotspots": [
                    { "type": "inspect", "label": "Inspect whiteboard", "icon": "📝", "x": 10, "y": 48, "puzzleId": "salle_cours" },
                    { "type": "inspect", "label": "Look out window", "icon": "🪟", "x": 30, "y": 35, "puzzleId": "fenetre_classe" },
                    { "type": "inspect", "label": "Student desk cold coffee", "icon": "☕", "x": 58, "y": 65, "puzzleId": "tasse_cafe_3" },
                    { "type": "move", "label": "Go back to stairs", "icon": "⬇️", "x": 50, "y": 86, "target": "stairs_central" }
                ]
            },
            "downstairs_it": {
                "title": "Alumni & IT Hub",
                "image": "downstrairs-choice_alumni-choice_IT.jpeg",
                "description": "Trophy cabinets gleam under neon lights. A 'Best Foosball Tournament' trophy sits right in the middle.",
                "hotspots": [
                    { "type": "move", "label": "To IT Room (Left)", "icon": "⬅️", "x": 22, "y": 48, "target": "it_room" },
                    { "type": "inspect", "label": "Trophy cabinets", "icon": "🏆", "x": 65, "y": 45, "puzzleId": "trophees" },
                    { "type": "move", "label": "Go up to stairs", "icon": "⬆️", "x": 50, "y": 86, "target": "stairs_central" }
                ]
            },
            "it_room": {
                "title": "IT Room / Tech Support",
                "image": "IT-room.jpeg",
                "description": "Blinking lights everywhere. A technician is sleeping with eyes open in front of a Python script.",
                "hotspots": [
                    { "type": "puzzle", "label": "Trial 4: The Timetable", "icon": "⏱️", "x": 45, "y": 42, "puzzleId": "epreuve_4" },
                    { "type": "inspect", "label": "Overheating server", "icon": "🔥", "x": 80, "y": 45, "puzzleId": "serveur_bug" },
                    { "type": "inspect", "label": "Server desk energy mug", "icon": "☕", "x": 25, "y": 55, "puzzleId": "tasse_cafe_4" },
                    { "type": "move", "label": "Exit to corridor", "icon": "⬇️", "x": 50, "y": 86, "target": "downstairs_it" }
                ]
            },
            "exterior_door": {
                "title": "Outdoor Exit Lobby",
                "image": "exterior-door.jpeg",
                "description": "Large glass doors lead directly to the outdoor terrace.",
                "hotspots": [
                    { "type": "move", "label": "Step out to terrace", "icon": "☀️", "x": 50, "y": 50, "target": "exterior_upstairs" },
                    { "type": "inspect", "label": "Lobby piano", "icon": "🎹", "x": 10, "y": 55, "puzzleId": "piano_hall" },
                    { "type": "move", "label": "Return to corridor", "icon": "⬇️", "x": 50, "y": 86, "target": "corridor_ext" }
                ]
            },
            "exterior_upstairs": {
                "title": "Upper Outdoor Terrace",
                "image": "exterior-upstairs.jpeg",
                "description": "A panoramic view of the campus buildings. A pigeon stares down students with utter contempt.",
                "hotspots": [
                    { "type": "move", "label": "Go down stairs", "icon": "↘️", "x": 83, "y": 62, "target": "exterior_downstairs" },
                    { "type": "inspect", "label": "Solitary flower pot", "icon": "🪴", "x": 55, "y": 50, "puzzleId": "pot_fleur" },
                    { "type": "move", "label": "Go back inside", "icon": "🚪", "x": 28, "y": 52, "target": "exterior_door" }
                ]
            },
            "exterior_downstairs": {
                "title": "Lower Outdoor Courtyard",
                "image": "Exterior-downstairs.jpeg",
                "description": "The lower courtyard with picnic tables. The Teqball table is desperately waiting for motivated players.",
                "hotspots": [
                    { "type": "puzzle", "label": "Trial 5: Final Accusation", "icon": "⚖️", "x": 42, "y": 62, "puzzleId": "epreuve_5" },
                    { "type": "inspect", "label": "Teqball table", "icon": "🏓", "x": 35, "y": 60, "puzzleId": "teqball" },
                    { "type": "move", "label": "Go back up to terrace", "icon": "↗️", "x": 85, "y": 55, "target": "exterior_upstairs" }
                ]
            }
        };

        this.currentSceneId = "entree";
        this.inventory = [];
        
        const savedBadges = localStorage.getItem("neoma_escape_badges");
        this.badges = savedBadges ? JSON.parse(savedBadges) : [];

        this.foundCoffeeCups = new Set();
        this.unlockedDoors = {};
        this.timeRemaining = 35 * 60;
        this.timerInterval = null;
        this.isGameOver = false;

        this.init();
    }

    init() {
        this.setupUI();
        document.getElementById('badge-count').textContent = this.badges.length;
        this.startTimer();
        this.loadScene(this.currentSceneId);
        document.getElementById('modal-briefing').classList.add('active');
    }

    setupUI() {
        document.getElementById('btn-briefing').addEventListener('click', () => {
            if (this.isGameOver) return;
            document.getElementById('modal-briefing').classList.add('active');
        });

        document.getElementById('btn-inventory').addEventListener('click', () => {
            if (this.isGameOver) return;
            this.renderInventory();
            document.getElementById('modal-inventory').classList.add('active');
        });

        document.getElementById('btn-badges').addEventListener('click', () => {
            if (this.isGameOver) return;
            this.renderBadges();
            document.getElementById('modal-badges').classList.add('active');
        });

        document.getElementById('close-dialogue').addEventListener('click', () => {
            document.getElementById('dialogue-box').style.display = 'none';
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
            if (this.isGameOver) return;

            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                timerEl.textContent = "00:00";
                this.triggerGameOver();
                return;
            }
            this.timeRemaining--;
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }

    triggerGameOver() {
        this.isGameOver = true;
        this.addBadge("you are so BAAAAD i will never hire you as a detective");

        const viewport = document.getElementById('game-viewport');
        viewport.innerHTML = `
            <div style="background: #8b0000; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 20px; z-index: 999; animation: pulse 1s infinite;">
                <h1 style="font-size: 3rem; color: #fff; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 3px;">🚨 TIME IS UP — SYSTEM LOCKDOWN 🚨</h1>
                <p style="font-size: 1.3rem; color: #ffeb3b; max-width: 600px; margin-bottom: 30px; line-height: 1.6;">
                    You ran out of time! Alex Morgan's file has been permanently erased into the digital void, and security escorted you off campus. 
                    <br><br><strong>New shameful badge acquired:</strong> <em>"you are so BAAAAD i will never hire you as a detective"</em>
                </p>
                <button id="btn-hard-restart" style="background: #000; color: #ff5e5e; border: 4px solid #fff; padding: 20px 40px; font-size: 1.5rem; font-weight: bold; border-radius: 12px; cursor: pointer; text-transform: uppercase; box-shadow: 0 10px 25px rgba(0,0,0,0.8); transition: transform 0.1s;">
                    🔄 RESTART FROM SCRATCH (AGAIN)
                </button>
            </div>
        `;

        document.getElementById('btn-hard-restart').addEventListener('click', () => {
            location.reload();
        });
    }

    loadScene(sceneId) {
        if (this.isGameOver) return;
        const scene = this.scenes[sceneId];
        if (!scene) return;

        this.currentSceneId = sceneId;
        document.getElementById('scene-title').textContent = scene.title;
        document.getElementById('scene-description').textContent = scene.description;
        document.getElementById('dialogue-box').style.display = 'block';
        
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
        if (this.isGameOver) return;
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
        if (this.isGameOver) return;
        const modal = document.getElementById('modal-puzzle');
        const title = document.getElementById('puzzle-title');
        const body = document.getElementById('puzzle-body');
        const feedback = document.getElementById('puzzle-feedback');
        feedback.textContent = "";

        title.textContent = "🔒 LOCKED ACCESS — AMPHITHEATRE DIGICODE";
        body.innerHTML = `
            <p>A numeric keypad blocks the entrance. (Hint: look for the blurry math logic on the foyer easel).</p>
            <div class="code-input-group">
                <input type="text" id="digicode-input" class="code-input" maxlength="4" placeholder="0000">
                <button id="btn-validate-code" class="hud-btn">Validate</button>
            </div>
        `;
        modal.classList.add('active');

        document.getElementById('btn-validate-code').addEventListener('click', () => {
            const val = document.getElementById('digicode-input').value.trim();
            if (val === "1926") {
                this.unlockedDoors[lockId] = true;
                feedback.style.color = "#00A88F";
                feedback.textContent = "✅ Surprisingly, it works. The doors unlock.";
                setTimeout(() => {
                    modal.classList.remove('active');
                    this.loadScene(targetScene);
                }, 1000);
            } else {
                feedback.style.color = "#ff5e5e";
                feedback.textContent = "❌ Nothing happens. Wrong code.";
            }
        });
    }

    openPuzzle(puzzleId) {
        if (this.isGameOver) return;
        const modal = document.getElementById('modal-puzzle');
        const title = document.getElementById('puzzle-title');
        const body = document.getElementById('puzzle-body');
        const feedback = document.getElementById('puzzle-feedback');
        feedback.textContent = "";

        if (puzzleId.startsWith("tasse_cafe_")) {
            this.foundCoffeeCups.add(puzzleId);
            title.textContent = "☕ Coffee Cup Found! (" + this.foundCoffeeCups.size + "/5)";
            body.innerHTML = `<p>You found another cup of coffee left behind by a tired student or staff member. Caffeine levels rising...</p>`;
            
            if (this.foundCoffeeCups.size === 5) {
                this.addBadge("it is a waste of time");
                body.innerHTML += `<p style="color: var(--neoma-yellow); margin-top: 15px; font-weight: bold;">🏆 Achievement unlocked: "it is a waste of time" (All 5 coffee cups collected!)</p>`;
            }
            modal.classList.add('active');
            return;
        }

        if (puzzleId === "plante_verte") {
            title.textContent = "🌿 Entrance Green Plant";
            body.innerHTML = `<p>You meticulously inspect the leaves. It's plastic. No clue here, but it looks very well maintained.</p>`;
        }
        else if (puzzleId === "gobelet_cafe") {
            title.textContent = "☕ Abandoned Coffee Cup";
            body.innerHTML = `<p>There's a sip of cold coffee left at the bottom. Someone drew a sad smiley face on it.</p>`;
        }
        else if (puzzleId === "fauteuils_amphi") {
            this.timeRemaining = Math.max(0, this.timeRemaining - 15 * 60);
            this.addBadge("short nap");
            title.textContent = "💺 Amphitheatre Seats";
            body.innerHTML = `
                <p>You sit down for a quick nap in the comfortable seats. The lecture drones on... Time flies, and you just lost 15 minutes! 😴</p>
                <p style="color: var(--neoma-yellow); margin-top: 15px; font-weight: bold;">🏆 Badge unlocked: "short nap"</p>
            `;
        }
        else if (puzzleId === "affiche_orientation") {
            title.textContent = "🗺️ Orientation Map";
            body.innerHTML = `<p>The map states 'You are here'. That's reassuring, but the maze of courses remains daunting.</p>`;
        }
        else if (puzzleId === "chaise_biblio") {
            title.textContent = "🪑 Squeaky Chair";
            body.innerHTML = `<p>You rock it slightly. It lets out a loud squeak that makes a neighboring student jump. Oops.</p>`;
        }
        else if (puzzleId === "livre_poussiererux") {
            title.textContent = "📖 Dusty Book";
            body.innerHTML = `
                <p>Title: *Introduction to Comparative Cost Accounting for Organic Carrots*. Fascinating, but entirely irrelevant.</p>
                <button id="btn-collect-badge" class="action-btn" style="margin-top:15px;">Claim Dusty Book Badge</button>
                <p id="badge-feedback" style="margin-top:10px; font-weight:bold;"></p>
            `;
            modal.classList.add('active');
            document.getElementById('btn-collect-badge').addEventListener('click', () => {
                document.getElementById('badge-feedback').style.color = "#00A88F";
                document.getElementById('badge-feedback').textContent = "🏆 Badge added to your Badges collection!";
                this.addBadge("Bravo tu t'intéresses aux antiquités en 2026!");
            });
            return;
        }
        else if (puzzleId === "portraits_alumni") {
            title.textContent = "🖼️ The Alumni Wall";
            body.innerHTML = `<p>Ultra-bright smiles of successful graduates. One of them strangely looks like your head professor.</p>`;
        }
        else if (puzzleId === "distributeur") {
            title.textContent = "🍫 Stubborn Vending Machine";
            body.innerHTML = `<p>You shake the machine a little. Your bag of marshmallows stays stuck behind the glass. Great start to the day.</p>`;
        }
        else if (puzzleId === "graffiti_escalier") {
            title.textContent = "✍️ Stairwell Graffiti";
            body.innerHTML = `<p>'The cafeteria coffee is a dark source of energy.' Deep philosophical truth.</p>`;
        }
        else if (puzzleId === "fenetre_classe") {
            title.textContent = "🪟 Classroom Window View";
            body.innerHTML = `<p>You see the parking lot in the distance. A car has been trying to parallel park for ten minutes.</p>`;
        }
        else if (puzzleId === "trophees") {
            title.textContent = "🏆 Trophy Showcase";
            body.innerHTML = `<p>Inter-school hackathon 2024 trophy. It shines brightly, but the dust tells another story.</p>`;
        }
        else if (puzzleId === "serveur_bug") {
            title.textContent = "🔥 Server Rack";
            body.innerHTML = `<p>A fan is blowing hard. It's heating up enough to bake pancakes on it.</p>`;
        }
        else if (puzzleId === "piano_hall") {
            title.textContent = "🎹 Lobby Piano";
            body.innerHTML = `<p>You hit a wrong note. Three people turn around looking annoyed. You decide to stop right there.</p>`;
        }
        else if (puzzleId === "pot_fleur") {
            title.textContent = "🪴 Solitary Flower Pot";
            body.innerHTML = `<p>There is a pebble painted blue inside. Why not.</p>`;
        }
        else if (puzzleId === "teqball") {
            title.textContent = "🏓 Teqball Table";
            body.innerHTML = `<p>The ball bounces weirdly. Unidentified sport approved.</p>`;
        }
        else if (puzzleId === "indice_chevalet") {
            title.textContent = "🔍 Easel Poster";
            body.innerHTML = `
                <p>Entrance sticky note:</p>
                <blockquote class="alex-quote">
                    « Take the numbers from the <strong>98%</strong> poster, do 9 - 8 = <strong>1</strong>, add <strong>9</strong>, and end with the year <strong>26</strong>. Code: <strong>1926</strong>. »
                </blockquote>
            `;
        }
        else if (puzzleId === "anecdote_neoma") {
            title.textContent = "📌 NEOMA Trivia Quiz (Useless Quest)";
            body.innerHTML = `
                <p>An existential question is displayed on the board. Who currently serves as the Dean / Managing Director of NEOMA Business School?</p>
                <div class="code-input-group">
                    <input type="text" id="neoma-dir-input" class="code-input" style="letter-spacing: normal; font-size: 1rem;" placeholder="Director's name...">
                    <button id="btn-validate-dir" class="hud-btn">Check</button>
                </div>
                <p id="dir-feedback" style="margin-top:10px; font-weight:bold;"></p>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-dir').addEventListener('click', () => {
                const reponse = document.getElementById('neoma-dir-input').value.trim().toLowerCase();
                const feedbackDir = document.getElementById('dir-feedback');
                if (reponse.includes("manceau") || reponse.includes("delphine manceau")) {
                    feedbackDir.style.color = "#00A88F";
                    feedbackDir.textContent = "🎯 Exactly! It's Delphine Manceau. It won't help you find Alex, but at least you'll shine by the coffee machine.";
                    this.addBadge("Master of NEOMA Trivia");
                } else {
                    feedbackDir.style.color = "#ff5e5e";
                    feedbackDir.textContent = "❌ Missed! Look up the official executive leadership of the school.";
                }
            });
            return;
        }
        else if (puzzleId === "boite_retour") {
            title.textContent = "📦 Book Return Box";
            body.innerHTML = `<p>Inside, there is a flyer for an underwater knitting club and an old forgotten biography of Alex Morgan.</p>`;
        }
        else if (puzzleId === "borne_tactile") {
            title.textContent = "🖥️ Touchscreen Kiosk";
            body.innerHTML = `
                <p>The screen offers a choice of cute cat wallpapers. In the corner, a glitching system notification flashes:</p>
                <blockquote class="alex-quote">
                    « [AUDIO LOG #03 — CAFETERIA]: ...static... <strong>the truth is hidden in the schedule</strong> ...static... »
                </blockquote>
            `;
        }
        else if (puzzleId === "salle_cours") {
            title.textContent = "📝 Classroom Whiteboard";
            body.innerHTML = `<p>Half-erased macroeconomics calculations briefly mention the 14:12 timestamp between GDP graphs.</p>`;
        }
        else if (puzzleId === "epreuve_1") {
            title.textContent = "📂 TRIAL 1 — THE IDENTITY GLITCH";
            body.innerHTML = `
                <p>Review the profiles and expose the anomaly:</p>
                <div class="files-grid">
                    <div class="student-card">
                        <h3>Chloé Bernard</h3>
                        <p>ID: NEO-2026-441</p>
                        <button class="suspect-btn" data-suspect="chloe">Accuse</button>
                    </div>
                    <div class="student-card">
                        <h3>Lucas Vance</h3>
                        <p>ID: NEO-2026-892 (Suspicious date: Feb 31)</p>
                        <button class="suspect-btn" data-suspect="lucas">Accuse</button>
                    </div>
                    <div class="student-card">
                        <h3>Inès El Amrani</h3>
                        <p>ID: NEO-2026-119</p>
                        <button class="suspect-btn" data-suspect="ines">Accuse</button>
                    </div>
                    <div class="student-card">
                        <h3>Alex Morgan</h3>
                        <p>ID: DELETED</p>
                        <button class="suspect-btn" data-suspect="alex">Accuse</button>
                    </div>
                </div>
            `;
            modal.classList.add('active');
            document.querySelectorAll('.suspect-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-suspect') === "lucas") {
                        feedback.style.color = "#00A88F";
                        feedback.innerHTML = "✅ Well spotted! Trial #1 validated: Lucas Vance's fake file & Transparent Card.";
                        this.addEvidence("Evidence #1: Lucas Vance's fake file & Transparent Card.");
                    } else {
                        feedback.style.color = "#ff5e5e";
                        feedback.textContent = "❌ This profile is completely clean.";
                    }
                });
            });
            return;
        }
        else if (puzzleId === "epreuve_2") {
            title.textContent = "🗺️ TRIAL 2 — THE INVISIBLE CAMPUS";
            body.innerHTML = `
                <p>Rank the 3 locations discovered using the transparent card chronologically:</p>
                <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
                    <select id="seq-1" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">1st location...</option>
                        <option value="biblio">The Library</option>
                        <option value="amphi">The Amphitheatre</option>
                        <option value="cafet">The Cafeteria</option>
                    </select>
                    <select id="seq-2" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">2nd location...</option>
                        <option value="biblio">The Library</option>
                        <option value="amphi">The Amphitheatre</option>
                        <option value="cafet">The Cafeteria</option>
                    </select>
                    <select id="seq-3" class="code-input" style="font-size: 1rem; letter-spacing: normal;">
                        <option value="">3rd location...</option>
                        <option value="biblio">The Library</option>
                        <option value="amphi">The Amphitheatre</option>
                        <option value="cafet">The Cafeteria</option>
                    </select>
                    <button id="btn-validate-ep2" class="action-btn">Validate</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep2').addEventListener('click', () => {
                if (document.getElementById('seq-1').value === "amphi" && 
                    document.getElementById('seq-2').value === "biblio" && 
                    document.getElementById('seq-3').value === "cafet") {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = "✅ Trial #2 validated: Invisible Campus fragments.";
                    this.addEvidence("Evidence #2: Invisible Campus fragments.");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Wrong order (Hint: Amphi -> Library -> Cafet).";
                }
            });
            return;
        }
        else if (puzzleId === "epreuve_3") {
            title.textContent = "📡 TRIAL 3 — THE BROKEN TRANSMISSION";
            body.innerHTML = `
                <p>Static crackles from the speakers, whispering a phrase... Enter the key phrase revealed:</p>
                <div class="code-input-group">
                    <input type="text" id="trans-input" class="code-input" style="letter-spacing: 2px; font-size: 1rem;" placeholder="Secret message...">
                    <button id="btn-validate-ep3" class="hud-btn">Validate</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep3').addEventListener('click', () => {
                if (document.getElementById('trans-input').value.toLowerCase().includes("truth is hidden")) {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = "✅ Trial #3 validated: Decoded transmission (« The truth is hidden in the schedule »).";
                    this.addEvidence("Evidence #3: Decoded transmission.");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Incorrect message.";
                }
            });
            return;
        }
        else if (puzzleId === "epreuve_4") {
            title.textContent = "⏱️ TRIAL 4 — THE IMPOSSIBLE TIMETABLE";
            body.innerHTML = `
                <p>At what exact time did the system purge the profile? (Format HH:MM)</p>
                <div class="code-input-group">
                    <input type="text" id="time-input" class="code-input" maxlength="5" placeholder="HH:MM">
                    <button id="btn-validate-ep4" class="hud-btn">Validate</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep4').addEventListener('click', () => {
                if (document.getElementById('time-input').value.trim() === "14:12") {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = "✅ Trial #4 validated: Exact deletion time confirmed.";
                    this.addEvidence("Evidence #4: File deletion timestamp (14:12).");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Wrong timestamp.";
                }
            });
            return;
        }
        else if (puzzleId === "epreuve_5") {
            title.textContent = "⚖️ TRIAL 5 — THE FINAL ACCUSATION";
            body.innerHTML = `
                <p>The moment of truth. Who is behind this elaborate setup?</p>
                <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                    <select id="acc-suspect" class="code-input" style="font-size:1rem; letter-spacing:normal;">
                        <option value="">Culprit...</option>
                        <option value="alex">Alex Morgan (Themselves)</option>
                        <option value="it">The IT Manager</option>
                        <option value="tuteur">The Student Tutor</option>
                    </select>
                    <button id="btn-validate-ep5" class="action-btn">Conclude Investigation</button>
                </div>
            `;
            modal.classList.add('active');
            document.getElementById('btn-validate-ep5').addEventListener('click', () => {
                if (document.getElementById('acc-suspect').value === "alex") {
                    feedback.style.color = "#00A88F";
                    feedback.innerHTML = `
                        <h2>🏆 CASE CLOSED — BUT YOUR FILE IS STILL OPEN</h2>
                        <p>« You spent 30 minutes looking for a missing student. But the real mystery was never about Alex. It was about whether you could work together. Welcome to NEOMA. »</p>
                        <p><strong>Campus Investigator Badge unlocked! 🎉</strong></p>
                    `;
                    this.addEvidence("Evidence #5: Solved Case + Campus Investigator Badge.");
                    this.addBadge("Campus Master Detective");
                } else {
                    feedback.style.color = "#ff5e5e";
                    feedback.textContent = "❌ Wrong suspect. Think about the final plot twist!";
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

    addBadge(badgeText) {
        if (!this.badges.includes(badgeText)) {
            this.badges.push(badgeText);
            localStorage.setItem("neoma_escape_badges", JSON.stringify(this.badges));
            document.getElementById('badge-count').textContent = this.badges.length;
        }
    }

    renderInventory() {
        const listEl = document.getElementById('inventory-list');
        if (this.inventory.length === 0) {
            listEl.innerHTML = '<p class="empty-msg">No evidence collected yet.</p>';
            return;
        }
        listEl.innerHTML = this.inventory.map(item => `<div class="evidence-item">✅ ${item}</div>`).join('');
    }

    renderBadges() {
        const listEl = document.getElementById('badges-list');
        if (this.badges.length === 0) {
            listEl.innerHTML = '<p class="empty-msg">No badges unlocked yet.</p>';
            return;
        }
        listEl.innerHTML = this.badges.map(badge => `<div class="evidence-item" style="border-left-color: var(--neoma-yellow);">🏅 ${badge}</div>`).join('');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new EscapeGame();
});