document.addEventListener('DOMContentLoaded', () => {
    const rainbowColors = [
        '#e81416',
        '#ffa500',
        '#faeb36',
        '#79c314',
        '#487de7',
        '#4b369d',
        '#70369d'
    ]
    
    function* getColor() {
        while (true) {
            for (const color of rainbowColors) {
                yield color;
            }
        }
    }

    const colorEnumerator = getColor();

    setInterval(() => {
        const root = document.querySelector(':root');

        root.style.setProperty('--main-color', colorEnumerator.next().value)
    }, 1000);
})