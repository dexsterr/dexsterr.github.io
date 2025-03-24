document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    // Ustawienie rozmiaru canvas
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Znaki do wyświetlenia (cyfry i litery)
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Inicjalizacja pozycji kropli
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        // Dodaj efekt zanikania (półprzezroczyste tło)
        ctx.fillStyle = 'rgba(26, 26, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ustaw styl tekstu
        ctx.fillStyle = '#680404'; // Czerwony kolor
        ctx.font = fontSize + 'px monospace';

        // Rysuj znaki
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Resetuj pozycję kropli, gdy dotrze do dołu
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Animacja
    setInterval(draw, 50);

    // Dostosuj canvas przy zmianie rozmiaru okna
    window.addEventListener('resize', () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    });
});
