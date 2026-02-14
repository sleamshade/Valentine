// Интерактивные эффекты для валентинки

window.addEventListener('load', () => {
    // Скрываем лоадер
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 2000);
});

// Создание фоновых сердечек
function createBackgroundHearts() {
    const container = document.querySelector('.hearts-bg');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(heart);
    }
}
createBackgroundHearts();

// Индикатор любви
function animateLoveMeter() {
    const meterFill = document.getElementById('loveMeter');
    if (meterFill) {
        setTimeout(() => {
            meterFill.style.width = '100%';
        }, 500);
    }
}

// Наблюдение за появлением секций
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Анимируем индикатор любви когда секция появляется
            if (entry.target.querySelector('#loveMeter')) {
                animateLoveMeter();
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// Запускаем анимацию индикатора сразу после загрузки (на случай если секция уже видна)
setTimeout(() => {
    const meterSection = document.querySelector('.interactive');
    if (meterSection && meterSection.getBoundingClientRect().top < window.innerHeight) {
        animateLoveMeter();
    }
}, 3000);

// Клик по сердечку
let heartCount = 0;
const heartBtn = document.getElementById('heartBtn');
const heartCountEl = document.getElementById('heartCount');

heartBtn.addEventListener('click', (e) => {
    heartCount++;
    heartCountEl.textContent = heartCount;
    
    // Создаём взрыв сердечек
    createHeartExplosion(e.clientX, e.clientY);
    
    // Вибрация кнопки
    heartBtn.style.animation = 'none';
    setTimeout(() => {
        heartBtn.style.animation = 'heartbeat 0.3s ease-in-out';
    }, 10);
});
    
// Взрыв сердечек при клике
function createHeartExplosion(x, y) {
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 9999;
            transition: all 1s ease-out;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            const angle = (Math.PI * 2 / 10) * i;
            const distance = Math.random() * 100 + 50;
            heart.style.transform = `
                translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) 
                rotate(${Math.random() * 360}deg) 
                scale(0)
            `;
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// Кнопки "Да" и "Нет"
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');

const yesMessages = [
    'Я так счастлив! 💕',
    'Ты сделала меня самым счастливым! 💖',
    'Люблю тебя бесконечно! 💝',
    'Это лучший день в моей жизни! 🥰',
    'Ты — моё всё! 💗'
];

let noClickCount = 0;
const noMessages = [
    'Уверена? 🥺',
    'Подумай ещё раз! 💕',
    'Я буду стараться лучше! 🥰',
    'Пожалуйста! 💖',
    'Ну пожалуйста! 💗',
    'Я тебя люблю! 💝'
];

yesBtn.addEventListener('click', () => {
    const message = yesMessages[Math.floor(Math.random() * yesMessages.length)];
    response.textContent = message;
    response.classList.add('show');
    
    // Создаём много сердечек
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createHeartExplosion(
                window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                window.innerHeight / 2 + (Math.random() - 0.5) * 200
            );
        }, i * 50);
    }
});

noBtn.addEventListener('click', () => {
    noClickCount++;
    
    if (noClickCount <= noMessages.length) {
        const message = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];
        response.textContent = message;
        response.classList.add('show');
        
        // Увеличиваем кнопку "Да"
        const currentScale = yesBtn.style.transform || 'scale(1)';
        const scaleMatch = currentScale.match(/scale\(([\d.]+)\)/);
        const currentScaleValue = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
        const newScale = Math.min(currentScaleValue + 0.3, 2);
        
        yesBtn.style.transform = `scale(${newScale})`;
        
        // Двигаем кнопку "Нет"
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        noBtn.style.position = 'fixed';
        noBtn.style.left = Math.random() * maxX + 'px';
        noBtn.style.top = Math.random() * maxY + 'px';
    } else {
        // После нескольких кликов всё равно показываем сообщение любви
        const message = 'В любом случае, я тебя люблю! 💕';
        response.textContent = message;
        response.classList.add('show');
    }
});

// Добавляем парящий эффект для карточек причин
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'float 0.5s ease-in-out';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = '';
    });
});

// Создаём падающие сердечки при скролле
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    if (st > lastScrollTop) {
        // Скролл вниз - создаём сердечки
        if (Math.random() > 0.7) {
            createFallingHeart();
        }
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
});

function createFallingHeart() {
    const heart = document.createElement('span');
    const hearts = ['❤️', '💕', '💖', '💗'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
        position: fixed;
        right: -50px;
        top: ${Math.random() * window.innerHeight}px;
        font-size: ${Math.random() * 20 + 15}px;
        pointer-events: none;
        z-index: 9999;
        transition: all 3s ease-out;
    `;
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.right = '100%';
        heart.style.opacity = '0';
    }, 10);
    
    setTimeout(() => heart.remove(), 3000);
}

// Конфетти при загрузке страницы
setTimeout(() => {
    createConfetti();
}, 2500);

function createConfetti() {
    const colors = ['#ff6b9d', '#ffb3d9', '#ffd700', '#ff69b4', '#ff1493'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -20px;
            pointer-events: none;
            z-index: 9998;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            transition: all ${Math.random() * 3 + 2}s ease-out;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 200 - 100}px)`;
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Следование за курсором (опционально)
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Создаём сердечко при движении мыши (редко)
let heartThrottle = 0;
document.addEventListener('mousemove', () => {
    heartThrottle++;
    if (heartThrottle > 50) {
        if (Math.random() > 0.8) {
            const heart = document.createElement('span');
            const hearts = ['💕', '✨', '💖'];
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${mouseX}px;
                top: ${mouseY}px;
                font-size: 15px;
                pointer-events: none;
                z-index: 9999;
                transition: all 1s ease-out;
                opacity: 0.7;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.transform = 'translateY(-50px) scale(0)';
                heart.style.opacity = '0';
            }, 10);
            
            setTimeout(() => heart.remove(), 1000);
        }
        heartThrottle = 0;
    }
});
