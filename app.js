class EscapeGame {
    constructor() {
        this.scenes = {};
        this.currentSceneId = null;
        this.inventory = [];
        this.timeRemaining = 35 * 60; // 35 minutes en secondes
        this.timerInterval = null;

        this.init();
    }

    async init() {
        try {
            // Chargement des données du campus depuis le JSON
            const response = await fetch('scenes.json');
            const data = await response.json();
            this.scenes = data.scenes;

            this.setupUI();
            this.startTimer();
            this.loadScene(data.startScene);

            // Affiche le briefing d'Alex au démarrage
            document.getElementById('modal-briefing').classList.add('active');
        } catch (error) {
            console.error("Erreur lors du chargement de scenes.json :", error);
            document.getElementById('scene-description').textContent = 
                "Erreur : impossible de charger scenes.json. Lance le projet via un serveur local (ex: Live Server).";
        }
    }

    setupUI() {
        // Ouverture des modales
        document.getElementById('btn-briefing').addEventListener('click', () => {
            document.getElementById('modal-briefing').classList.add('active');
        });

        document.getElementById('btn-inventory').addEventListener('click', () => {
            this.renderInventory();
            document.getElementById('modal-inventory').classList.add('active');
        });

        // Fermeture des modales
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
        if (!scene) {
            console.error(`Scène introuvable : ${sceneId}`);
            return;
        }

        this.currentSceneId = sceneId;

        // Mise à jour de l'interface
        document.getElementById('scene-title').textContent = scene.title;
        document.getElementById('scene-description').textContent = scene.description;
        
        const imgEl = document.getElementById('scene-image');
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgEl.src = scene.image;
            imgEl.style.opacity = 1;
        }, 150);

        // Génération des zones cliquables (flèches / indices)
        const hotspotsLayer = document.getElementById('hotspots-layer');
        hotspotsLayer.innerHTML = '';

        scene.hotspots.forEach(spot => {
            const btn = document.createElement('button');
            btn.className = 'hotspot';
            btn.style.left = `${spot.x}%`;
            btn.style.top = `${spot.y}%`;
            btn.innerHTML = `<span class="hotspot-icon">${spot.icon}</span> <span>${spot.label}</span>`;

            btn.addEventListener('click', () => this.handleHotspotClick(spot));
            hotspotsLayer.appendChild(btn);
        });
    }

    handleHotspotClick(spot) {
        if (spot.type === 'move') {
            this.loadScene(spot.target);
        } else if (spot.type === 'puzzle') {
            // Prêt pour accueillir tes 5 épreuves
            alert(`Lancement de l'épreuve : ${spot.puzzleId}`);
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

// Lancement du jeu au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    new EscapeGame();
});