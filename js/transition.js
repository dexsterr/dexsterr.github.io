document.addEventListener('DOMContentLoaded', () => {
    // Dodaj klasę fade do body przy ładowaniu strony
    document.body.classList.add('fade');

    // Przechwytuj kliknięcia w linki
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Zapobiegaj domyślnemu przejściu
            const href = link.getAttribute('href');

            // Dodaj efekt fade-out
            document.body.classList.add('fade-out');

            // Poczekaj na zakończenie animacji i przejdź do nowej strony
            setTimeout(() => {
                window.location.href = href;
            }, 500); // 500ms to czas trwania animacji fade
        });
    });
});
