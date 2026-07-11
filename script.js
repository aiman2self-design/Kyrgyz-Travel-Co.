const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const waValue = document.getElementById('number').value;
    const peopleCountValue = document.getElementById('peopleCount').value;
    const travelDatesValue = document.getElementById('travelDates').value;
    const additionalInfoValue = document.getElementById('message').value;

    alert('Спасибо! Ваша заявка отправлена.');

    try {
        await fetch("https://api.telegram.org/bot8247879526:AAH9HJ9jFI3DVGSZ4GJwBjrygXV-nzzurMQ/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: 5332398221,
                text: `Новое сообщение с сайта:
Имя: ${nameValue}
Email: ${emailValue}
WhatsApp: ${waValue}
Количество человек: ${peopleCountValue}
Даты поездки: ${travelDatesValue}
Дополнительная информация: ${additionalInfoValue}`
            })
        });
    } catch (err) {
        console.error("Ошибка отправки в Telegram:", err);
    }

    form.reset();
});


document.getElementById('ctaWa').addEventListener('click', () => {
    const emailValue = document.getElementById('email').value;
    const waValue = document.getElementById('number').value;
    const peopleCountValue = document.getElementById('peopleCount').value;
    const travelDatesValue = document.getElementById('travelDates').value;
    const additionalInfoValue = document.getElementById('message').value;

    const message = `Здравствуйте! Хочу узнать про тур.
Email: ${emailValue}
WhatsApp: ${waValue}
Количество человек: ${peopleCountValue}
Даты поездки: ${travelDatesValue}
Дополнительная информация: ${additionalInfoValue}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/996702440123?text=${encodedMessage}`, '_blank');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });


            const nav = document.querySelector('nav');
            if (nav) {
                nav.classList.remove('active');
            }
        }
    });
});


document.getElementById('goTour').addEventListener('click', function() {
    document.getElementById('choose-adventure').scrollIntoView({
        behavior: 'smooth'
    });
});



const themeToggle = document.getElementById("themeToggle");


let savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";


themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
});

const switcher = document.getElementById("langSwitcher");
let lang = "en"; // Автоматически английский при входе

// Функция для переключения языка
function switchLanguage() {
    document.querySelectorAll("[data-en]").forEach(el => {
        if (lang === "en") {
            el.dataset.originalText = el.innerHTML;
            el.innerHTML = el.getAttribute("data-en");
        } else {
            if (el.dataset.originalText) {
                el.innerHTML = el.dataset.originalText;
            }
        }
    });

    document.querySelectorAll("[data-en-placeholder]").forEach(el => {
        if (lang === "en") {
            el.dataset.originalPlaceholder = el.placeholder;
            el.placeholder = el.getAttribute("data-en-placeholder");
        } else {
            if (el.dataset.originalPlaceholder) {
                el.placeholder = el.dataset.originalPlaceholder;
            }
        }
    });

    // Обновляем текст переключателя языка
    if (switcher) {
        switcher.textContent = lang === "en" ? "RU" : "EN";
    }
}

// Инициализируем язык и модальное окно при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем язык
    switchLanguage();

    // Назначаем обработчик переключения языка
    if (switcher) {
        switcher.addEventListener("click", () => {
            lang = lang === "ru" ? "en" : "ru";
            switchLanguage();
        });
    }

    // Инициализируем модальное окно
    const openBtn = document.getElementById("openScheduleBtn");
    const modal = document.getElementById("scheduleModal");
    const closeBtn = modal ? modal.querySelector(".close") : null;

    // Инициализируем табы туров
    const tourTabs = document.querySelectorAll('.tour-tab');
    const tourContents = document.querySelectorAll('.tour-content');

    tourTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tourId = this.getAttribute('data-tour');

            // Убираем активный класс со всех табов и контента
            tourTabs.forEach(t => t.classList.remove('active'));
            tourContents.forEach(c => c.classList.remove('active'));

            // Добавляем активный класс к выбранному табу и контенту
            this.classList.add('active');
            const contentEl = document.getElementById(`tour-${tourId}`);
            if (contentEl) {
                contentEl.classList.add('active');
            }
        });
    });

    // По умолчанию открываем первый тур
    if (tourTabs.length > 0) {
        tourTabs[0].click();
    }
});