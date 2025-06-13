function toggleBio() {
    const bio = document.getElementById('bio');
    bio.style.display = bio.style.display === 'none' ? 'block' : 'none';
}

// Bounce animation for pitch on click
document.addEventListener('DOMContentLoaded', () => {
    const pitch = document.querySelector('.pitch-text');
    if (pitch) {
        pitch.addEventListener('click', () => {
            pitch.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                pitch.style.animation = '';
            }, 500);
        });
    }
});

// Inject bounce animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes bounce {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);
