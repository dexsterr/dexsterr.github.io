// Efekt Matrix
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Ustawienie rozmiaru kanwy
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Znaki do wyświetlenia (0 i 1)
const chars = '01';
const fontSize = 14;
const columns = Math.floor(canvas.width / (fontSize * 2)); // Mniejsza gęstość (podwójna odległość między kolumnami)
const drops = [];

// Inicjalizacja pozycji kropli (efekt "w trakcie")
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height; // Losowa pozycja początkowa
}

// Funkcja rysująca efekt Matrix
function draw() {
    // Dodanie półprzezroczystego tła, aby znaki powoli znikały
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Większa przezroczystość tła
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ustawienie stylu tekstu
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Ciemniejszy czerwony z większą przezroczystością
    ctx.font = fontSize + 'px monospace';

    // Rysowanie znaków
    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize * 2, drops[i] * fontSize); // Podwójna odległość między kolumnami

        // Resetowanie kropli, gdy dotrze do dołu
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Uruchomienie animacji
setInterval(draw, 50); // Szybkość animacji (50ms)

// Dostosowanie rozmiaru kanwy przy zmianie rozmiaru okna
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});
