document.addEventListener('DOMContentLoaded', () => {
    const btnVideo = document.getElementById('btn-video');
    const btnGallery = document.getElementById('btn-gallery');
    
    const videoModal = document.getElementById('video-modal');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryGrid = document.getElementById('gallery-grid');
    
    const videoSelection = document.getElementById('video-selection');
    const backToList = document.getElementById('back-to-list');
    const ytPlayer = document.getElementById('yt-player');
    const videoCards = document.querySelectorAll('.video-card');
    const closes = document.querySelectorAll('.close');

    // 1️⃣ Ouvrir modale vidéo
    btnVideo.addEventListener('click', () => {
        videoModal.classList.add('active');
        resetVideoPlayer();
    });

    // Sélection d'un documentaire
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.dataset.video;
            videoSelection.classList.add('hidden');
            backToList.classList.remove('hidden');
            ytPlayer.classList.remove('hidden');
            ytPlayer.src = src;
        });
    });

    // Retour à la liste
    backToList.addEventListener('click', resetVideoPlayer);

    // Réinitialise le lecteur
    function resetVideoPlayer() {
        ytPlayer.src = '';
        ytPlayer.classList.add('hidden');
        backToList.classList.add('hidden');
        videoSelection.classList.remove('hidden');
    }

    // 2️⃣ Galerie des partitions
    btnGallery.addEventListener('click', () => {
        const partitions = [
            { titre: 'Rythme Traditionnel Gin', description: 'Partition complète avec doigtés', prix: '10 000 FCFA', image: 'partition1-apercu.jpg' },
            { titre: 'Chant Sacré - Mode Mineur', description: 'Transcription détaillée + notes pédagogiques', prix: '12 000 FCFA', image: 'partition2-apercu.jpg' },
            { titre: 'Cycle Rythmique 12/8', description: 'Étude avancée pour percussionnistes', prix: '15 000 FCFA', image: 'partition3-apercu.jpg' }
        ];
        
        galleryGrid.innerHTML = '';
        partitions.forEach(p => {
            const card = document.createElement('div');
            card.className = 'partition-card';
            card.innerHTML = `
                <img src="assets/${p.image}" alt="${p.titre}" class="partition-thumb" loading="lazy">
                <div class="partition-info">
                    <h4>${p.titre}</h4>
                    <p style="font-size:0.9rem; opacity:0.9; margin:0.3rem 0;">${p.description}</p>
                    <p class="partition-price">${p.prix}</p>
                    <p style="font-size:0.85rem; opacity:0.85; margin:0.5rem 0 0;">📦 Sur commande</p>
                </div>
                <button class="btn-buy" onclick="commanderPartition('${p.titre}', '${p.prix}')">
                    💬 Commander via WhatsApp
                </button>
            `;
            galleryGrid.appendChild(card);
        });
        galleryModal.classList.add('active');
    });

    // Fonction helper WhatsApp
    window.commanderPartition = (titre, prix) => {
        const message = encodeURIComponent(
            `Bonjour Professeur GOEH-AKUE Adovi,\n\nJe souhaite commander la partition : "${titre}"\nPrix indiqué : ${prix}\n\nMerci de me confirmer la disponibilité et les modalités de paiement.`
        );
        window.open(`https://wa.me/22890097874?text=${message}`, '_blank');
    };

    // Fermeture modales
    const fermerModals = () => {
        videoModal.classList.remove('active');
        galleryModal.classList.remove('active');
        resetVideoPlayer();
    };

    closes.forEach(btn => btn.addEventListener('click', fermerModals));
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal')) fermerModals(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermerModals(); });
});