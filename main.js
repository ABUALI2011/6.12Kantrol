// Плавный скролл по якорям (анимация как в популярных демках с CodePen)
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Бургер-меню
const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');

if (burgerBtn && mainNav) {
  burgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('hidden');
    mainNav.classList.toggle('flex');
  });
}

// Изменение хедера и прогресс-бар прокрутки (эффект как на CodePen)
const header = document.querySelector('header');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 20;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;

  if (header) {
    header.classList.toggle('shadow-lg', scrolled);
    header.classList.toggle('bg-white/95', scrolled);
    header.classList.toggle('backdrop-blur', scrolled);
  }

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }
});

// Кнопка "наверх" с плавным появлением
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.setAttribute('aria-label', 'Наверх');
backToTop.className =
  'fixed bottom-6 right-6 z-50 hidden items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white text-xl shadow-lg transition-opacity duration-300';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.remove('hidden');
    backToTop.classList.add('flex');
  } else {
    backToTop.classList.add('hidden');
    backToTop.classList.remove('flex');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Подсветка активного пункта меню по мере скролла
const sectionsForNav = document.querySelectorAll(
  '#catalog, #credit, #reviews, #about, #contacts'
);
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const setActiveNav = () => {
  let currentId = null;

  sectionsForNav.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    const hrefId = link.getAttribute('href').slice(1);
    if (hrefId === currentId) {
      link.classList.add('text-red-600');
    } else {
      link.classList.remove('text-red-600');
    }
  });
};

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Небольшой "typewriter" эффект для подзаголовка в hero (вдохновлено CodePen)
const heroSubtitle = document.querySelector(
  'section.bg-gray-200 p.text-gray-600'
);

// Если не нашли по селектору, возьмем текст "Узнай свою цену!"
const heroTextElement =
  heroSubtitle || document.querySelector('section.bg-gray-200 p.text-gray-600');

if (heroTextElement) {
  const fullText = heroTextElement.textContent.trim();
  let index = 0;
  heroTextElement.textContent = '';

  function type() {
    if (index <= fullText.length) {
      heroTextElement.textContent = fullText.slice(0, index);
      index += 1;
      setTimeout(type, 80);
    }
  }

  // Запускаем чуть позже, чтобы сработал AOS
  setTimeout(type, 800);
}

// Параллакс-эффект для машин на первом экране
const heroSection = document.getElementById('hero');
const heroCars = heroSection
  ? heroSection.querySelectorAll('img[alt^="Автомобиль"]')
  : [];

if (heroSection && heroCars.length) {
  heroSection.addEventListener('mousemove', e => {
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;

    heroCars.forEach((img, index) => {
      const depth = (index + 1) * 10;
      img.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    heroCars.forEach(img => {
      img.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

