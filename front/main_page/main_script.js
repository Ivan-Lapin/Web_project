const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        const targetElement = document.querySelector(blockID);
        
        // Функция для плавной прокрутки
        smoothScroll(targetElement, 1000); // 1000 мс = 1 секунда
    });
}

// Функция для плавной прокрутки
function smoothScroll(target, duration) {
    const start = window.scrollY; // Начальная позиция
    const end = target.getBoundingClientRect().top + start; // Конечная позиция
    const distance = end - start; // Расстояние для прокрутки
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Прогресс от 0 до 1

        // Применяем easing (плавность)
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, start + distance * ease); // Прокрутка
        if (timeElapsed < duration) requestAnimationFrame(animation); // Продолжаем анимацию
    }

    requestAnimationFrame(animation);
}

// Функция easing
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
