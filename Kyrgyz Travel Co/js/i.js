const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const waValue = document.getElementById('number').value;
    const messageValue = document.getElementById('message').value;

    alert('Спасибо! Ваша заявка отправлена.');

    
    try {
        await fetch("https://api.telegram.org/bot8247879526:AAH9HJ9jFI3DVGSZ4GJwBjrygXV-nzzurMQ/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: 5332398221,
                text:
                    `Новое сообщение с сайта:
Имя: ${nameValue}
Email: ${emailValue}
WhatsApp: ${waValue}
Сообщение: ${messageValue}`
            })
        });
    } catch (err) {
        console.error("Ошибка отправки в Telegram:", err);
    }

    form.reset();
});


document.getElementById('ctaWa').addEventListener('click', () => {
    window.open('https://wa.me/996771?text=Здравствуйте!%20Я%20по%20поводу%20тура...', '_blank');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            
            document.querySelector('nav').classList.remove('active');
        }
    });
});


document.getElementById('down').addEventListener('click', function () {
    window.scrollTo({
        top: document.body.scrollHeight,
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
let lang = "ru";

switcher.addEventListener("click", () => {
    lang = lang === "ru" ? "en" : "ru";

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
});


const toggleButton = document.getElementById('themeToggle');
const iconElement = toggleButton.querySelector('.icon'); 
const body = document.body;

function setTheme(theme) {
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark-theme') {
        iconElement.textContent = '☀️';
        toggleButton.setAttribute('aria-label', 'Включить светлую тему');
    } else {
        iconElement.textContent = '🌙';
        toggleButton.setAttribute('aria-label', 'Включить тёмную тему');
    }
}

function getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme';
}

setTheme(getPreferredTheme());

toggleButton.addEventListener('click', () => {
    
    iconElement.classList.add('rotate-animation');
    
    setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
    }, 500); 

    const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    setTheme(newTheme);
});