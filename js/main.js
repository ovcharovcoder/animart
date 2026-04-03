// ---- 8 товарів з різними типами анімацій ----
const products = [
  {
    id: 1,
    name: '💎 Кристал душі',
    price: 1299,
    animType: 'bounceAndShake',
    desc: 'стрибок + тряска',
  },
  {
    id: 2,
    name: '🍃 Ароматичний камінь',
    price: 549,
    animType: 'spinAndGlow',
    desc: 'обертання + світіння',
  },
  {
    id: 3,
    name: '🎧 Астральні навушники',
    price: 2499,
    animType: 'rippleWave',
    desc: 'хвилі від корзини',
  },
  {
    id: 4,
    name: '⌚ Хроно-годинник',
    price: 1899,
    animType: 'explodeStars',
    desc: 'зоряний вибух',
  },
  {
    id: 5,
    name: '📷 Магічна камера',
    price: 3450,
    animType: 'flyAndRotate',
    desc: 'політ з обертанням',
  },
  {
    id: 6,
    name: '🧴 Еліксир молодості',
    price: 750,
    animType: 'jellyMorph',
    desc: 'желейна деформація',
  },
  {
    id: 7,
    name: '🔮 Кришталева куля',
    price: 1999,
    animType: 'colorfulBlast',
    desc: 'кольоровий спалах',
  },
  {
    id: 8,
    name: '⚡ Блискавичний дрон',
    price: 3990,
    animType: 'electricZap',
    desc: 'електричний розряд',
  },
];

// Дані для відгуків (4 картки) – друга має flip-ефект
const testimonials = [
  {
    id: 1,
    name: 'Андрій',
    review:
      'Неймовірна якість! Товар перевершив очікування, а анімація кошика — це просто магія ✨',
    rating: 5,
    animHover: 'rotate3d',
    entryAnim: 'slideUp',
    hasFlip: false,
  },
  {
    id: 2,
    name: 'Андрій',
    review:
      'Дуже задоволений покупкою. Доставка швидка, а 3D ефекти на сайті вражають!',
    rating: 5,
    animHover: null,
    entryAnim: 'slideLeft',
    hasFlip: true,
    backText:
      '💖 Дякуємо за довіру! Повертайся за новими магічними речами. Знижка 10% на наступне замовлення!',
  },
  {
    id: 3,
    name: 'Андрій',
    review:
      'Креативний підхід до анімацій. Кожна кнопка оживає, робить шопінг цікавим. Буду замовляти ще!',
    rating: 4,
    animHover: 'spring',
    entryAnim: 'slideRight',
    hasFlip: false,
  },
  {
    id: 4,
    name: 'Андрій',
    review:
      'Відмінний сервіс та оригінальний дизайн. 3D картки відгуків виглядають дуже стильно!',
    rating: 5,
    animHover: 'flipX',
    entryAnim: 'zoomRotate',
    hasFlip: false,
  },
];

let cartItems = [];
let totalCount = 0;
let totalPrice = 0;

const cartCountSpan = document.getElementById('cartCount');
const cartTotalDisplay = document.getElementById('cartTotalDisplay');
const productGrid = document.getElementById('productGrid');
const toastMsgDiv = document.getElementById('toastMsg');
const testimonialsGrid = document.getElementById('testimonialsGrid');

function updateCartUI() {
  totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  cartCountSpan.innerText = totalCount;
  cartTotalDisplay.innerText = totalPrice + ' ₴';
  const badge = document.querySelector('.cart-count');
  if (badge) {
    badge.style.transform = 'scale(1.25)';
    setTimeout(() => {
      if (badge) badge.style.transform = 'scale(1)';
    }, 200);
  }
}

function showToast(message, isSuccess = true) {
  toastMsgDiv.innerText = message;
  toastMsgDiv.style.backgroundColor = isSuccess ? '#1e3a2f' : '#9b2c1d';
  toastMsgDiv.style.transform = 'translateX(-50%) translateY(0px)';
  toastMsgDiv.style.opacity = '1';
  setTimeout(() => {
    toastMsgDiv.style.opacity = '0';
    toastMsgDiv.style.transform = 'translateX(-50%) translateY(100px)';
  }, 1600);
}

// Додавання товару (повна копія з попереднього рішення)
function addToCart(product, cardElement, clickEvent) {
  const existing = cartItems.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
    showToast(`➕ ${product.name} +1 (тепер ${existing.quantity})`, true);
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    showToast(`🛍️ ${product.name} додано!`, true);
  }
  updateCartUI();

  const globalCartElem = document.getElementById('globalCartWrapper');
  const targetRect = globalCartElem.getBoundingClientRect();
  const targetX = targetRect.left + targetRect.width / 2 - 26;
  const targetY = targetRect.top + targetRect.height / 2 - 26;

  const startX = clickEvent.clientX - 26;
  const startY = clickEvent.clientY - 26;

  const flyer = document.createElement('div');
  flyer.classList.add('flying-item');
  flyer.style.left = startX + 'px';
  flyer.style.top = startY + 'px';
  flyer.style.opacity = '0.95';
  flyer.innerHTML = `<svg viewBox="0 0 24 24" stroke="white" stroke-width="1.5" fill="none"><path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 16.3C4.3 16.9 4.7 17.5 5.4 17.5H18M18 17.5C16.9 17.5 16 18.4 16 19.5C16 20.6 16.9 21.5 18 21.5C19.1 21.5 20 20.6 20 19.5C20 18.4 19.1 17.5 18 17.5ZM9 19.5C9 20.6 8.1 21.5 7 21.5C5.9 21.5 5 20.6 5 19.5C5 18.4 5.9 17.5 7 17.5C8.1 17.5 9 18.4 9 19.5Z"/></svg>`;
  document.body.appendChild(flyer);

  requestAnimationFrame(() => {
    flyer.style.transform = `translate(${targetX - startX}px, ${targetY - startY}px) scale(0.55)`;
    flyer.style.opacity = '0.5';
  });

  setTimeout(() => {
    flyer.remove();
    globalCartElem.style.transform = 'scale(1.08)';
    setTimeout(() => {
      if (globalCartElem) globalCartElem.style.transform = '';
    }, 180);
  }, 550);

  const buyBtn = cardElement.querySelector('.buy-btn');
  const rectBtn = buyBtn.getBoundingClientRect();
  const plusDiv = document.createElement('div');
  plusDiv.classList.add('plus-one');
  plusDiv.innerText = '+1';
  plusDiv.style.left = rectBtn.left + rectBtn.width / 2 - 20 + 'px';
  plusDiv.style.top = rectBtn.top - 20 + 'px';
  document.body.appendChild(plusDiv);
  setTimeout(() => plusDiv.remove(), 800);

  const cardIcon = cardElement.querySelector('.card-cart-icon');
  if (cardIcon) {
    cardIcon.classList.add('pop-animation-card');
    setTimeout(() => cardIcon.classList.remove('pop-animation-card'), 400);
  }

  applyUniqueAnimation(product, cardElement, clickEvent);
}

// 8 унікальних анімацій
function applyUniqueAnimation(product, cardElement, event) {
  const type = product.animType;
  const cardRect = cardElement.getBoundingClientRect();

  switch (type) {
    case 'bounceAndShake':
      cardElement.style.transform = 'translateY(-12px) rotate(1deg)';
      setTimeout(() => {
        cardElement.style.transform = '';
      }, 250);
      const flash = document.createElement('div');
      flash.style.position = 'fixed';
      flash.style.top = cardRect.top + 'px';
      flash.style.left = cardRect.left + 'px';
      flash.style.width = cardRect.width + 'px';
      flash.style.height = cardRect.height + 'px';
      flash.style.background =
        'radial-gradient(circle, rgba(230,126,34,0.3) 0%, rgba(0,0,0,0) 70%)';
      flash.style.pointerEvents = 'none';
      flash.style.borderRadius = '2rem';
      flash.style.zIndex = '999';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 300);
      break;
    case 'spinAndGlow':
      const svgSpin = cardElement.querySelector('.card-cart-icon svg');
      if (svgSpin) {
        svgSpin.style.transition = 'transform 0.5s ease';
        svgSpin.style.transform = 'rotate(540deg)';
        setTimeout(() => {
          if (svgSpin) svgSpin.style.transform = '';
        }, 500);
      }
      cardElement.style.boxShadow =
        '0 0 0 4px #f39c12, 0 0 0 8px rgba(243,156,18,0.3)';
      setTimeout(() => (cardElement.style.boxShadow = ''), 500);
      break;
    case 'rippleWave':
      const iconCenter = cardElement.querySelector('.card-cart-icon');
      if (iconCenter) {
        const rect = iconCenter.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
          const ripple = document.createElement('div');
          ripple.style.position = 'fixed';
          ripple.style.left = rect.left + rect.width / 2 - 20 + 'px';
          ripple.style.top = rect.top + rect.height / 2 - 20 + 'px';
          ripple.style.width = '40px';
          ripple.style.height = '40px';
          ripple.style.borderRadius = '50%';
          ripple.style.border = '2px solid #e67e22';
          ripple.style.opacity = '0.8';
          ripple.style.pointerEvents = 'none';
          ripple.style.zIndex = '1000';
          ripple.style.transform = 'scale(0.5)';
          ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s';
          document.body.appendChild(ripple);
          setTimeout(() => {
            ripple.style.transform = 'scale(3)';
            ripple.style.opacity = '0';
          }, 10);
          setTimeout(() => ripple.remove(), 600);
        }
      }
      break;
    case 'explodeStars':
      for (let i = 0; i < 12; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.position = 'fixed';
        star.style.fontSize = '22px';
        star.style.left = event.clientX + (Math.random() - 0.5) * 120 + 'px';
        star.style.top = event.clientY + (Math.random() - 0.5) * 100 + 'px';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '1200';
        star.style.transition = 'transform 0.5s, opacity 0.5s';
        document.body.appendChild(star);
        setTimeout(() => {
          star.style.transform = `translate(${(Math.random() - 0.5) * 80}px, ${(Math.random() - 0.5) * 70 - 40}px) scale(0.5)`;
          star.style.opacity = '0';
        }, 10);
        setTimeout(() => star.remove(), 600);
      }
      break;
    case 'flyAndRotate':
      const extraFly = document.createElement('div');
      extraFly.style.position = 'fixed';
      extraFly.style.left = event.clientX + 'px';
      extraFly.style.top = event.clientY + 'px';
      extraFly.style.width = '40px';
      extraFly.style.height = '40px';
      extraFly.style.background = '#e67e22';
      extraFly.style.borderRadius = '12px';
      extraFly.style.display = 'flex';
      extraFly.style.alignItems = 'center';
      extraFly.style.justifyContent = 'center';
      extraFly.style.fontSize = '24px';
      extraFly.innerHTML = '🌀';
      extraFly.style.pointerEvents = 'none';
      extraFly.style.zIndex = '1400';
      extraFly.style.transition = 'all 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.2)';
      document.body.appendChild(extraFly);
      setTimeout(() => {
        extraFly.style.transform =
          'translate(80px, -120px) rotate(720deg) scale(0.2)';
        extraFly.style.opacity = '0';
      }, 10);
      setTimeout(() => extraFly.remove(), 750);
      break;
    case 'jellyMorph':
      const jellyIcon = cardElement.querySelector('.card-cart-icon');
      if (jellyIcon) {
        jellyIcon.style.transition =
          'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        jellyIcon.style.transform = 'scale(1.3) skew(5deg, 3deg)';
        setTimeout(() => {
          if (jellyIcon) jellyIcon.style.transform = 'scale(0.9)';
        }, 120);
        setTimeout(() => {
          if (jellyIcon) jellyIcon.style.transform = 'scale(1.05)';
        }, 240);
        setTimeout(() => {
          if (jellyIcon) jellyIcon.style.transform = 'scale(1)';
        }, 360);
      }
      cardElement.style.backgroundColor = '#fff2e0';
      setTimeout(() => (cardElement.style.backgroundColor = ''), 400);
      break;
    case 'colorfulBlast':
      const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = event.clientX + (Math.random() - 0.5) * 70 + 'px';
        particle.style.top = event.clientY + (Math.random() - 0.5) * 60 + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1001';
        particle.style.transition = 'all 0.5s ease-out';
        document.body.appendChild(particle);
        setTimeout(() => {
          particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 80 - 40}px) scale(0)`;
          particle.style.opacity = '0';
        }, 10);
        setTimeout(() => particle.remove(), 550);
      }
      break;
    case 'electricZap':
      const zapBtn = cardElement.querySelector('.buy-btn');
      if (zapBtn) {
        const btnRect = zapBtn.getBoundingClientRect();
        for (let z = 0; z < 5; z++) {
          const bolt = document.createElement('div');
          bolt.style.position = 'fixed';
          bolt.style.width = '3px';
          bolt.style.height = `${20 + Math.random() * 30}px`;
          bolt.style.background = '#f1c40f';
          bolt.style.left =
            btnRect.left +
            btnRect.width / 2 +
            (Math.random() - 0.5) * 40 +
            'px';
          bolt.style.top =
            btnRect.top - 10 + Math.random() * btnRect.height + 'px';
          bolt.style.filter = 'blur(2px)';
          bolt.style.boxShadow = '0 0 6px #f39c12';
          bolt.style.pointerEvents = 'none';
          bolt.style.zIndex = '1002';
          bolt.style.transition = 'opacity 0.3s';
          document.body.appendChild(bolt);
          setTimeout(() => (bolt.style.opacity = '0'), 80);
          setTimeout(() => bolt.remove(), 400);
        }
      }
      const priceSpan = cardElement.querySelector('.product-price');
      if (priceSpan) {
        priceSpan.style.transform = 'translateX(5px)';
        setTimeout(() => {
          if (priceSpan) priceSpan.style.transform = 'translateX(-5px)';
        }, 70);
        setTimeout(() => {
          if (priceSpan) priceSpan.style.transform = 'translateX(3px)';
        }, 140);
        setTimeout(() => {
          if (priceSpan) priceSpan.style.transform = 'translateX(0)';
        }, 210);
      }
      break;
    default:
      break;
  }
}

function renderProducts() {
  productGrid.innerHTML = '';
  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = `product-card`;
    const cartIconHtml = `
                <div class="card-cart-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 16.3C4.3 16.9 4.7 17.5 5.4 17.5H18M18 17.5C16.9 17.5 16 18.4 16 19.5C16 20.6 16.9 21.5 18 21.5C19.1 21.5 20 20.6 20 19.5C20 18.4 19.1 17.5 18 17.5ZM9 19.5C9 20.6 8.1 21.5 7 21.5C5.9 21.5 5 20.6 5 19.5C5 18.4 5.9 17.5 7 17.5C8.1 17.5 9 18.4 9 19.5Z"/>
                    </svg>
                </div>
                <div class="product-title">${prod.name}</div>
                <div class="product-price">${prod.price} ₴</div>
                <button class="buy-btn" data-id="${prod.id}">🛒 Купити</button>
                <div style="font-size: 0.7rem; margin-top: 8px; opacity:0.7;">✨ ${prod.desc}</div>
            `;
    card.innerHTML = cartIconHtml;
    productGrid.appendChild(card);
    const buyBtn = card.querySelector('.buy-btn');
    buyBtn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(prod, card, e);
    });
  });
}

// Рендер 3D карток відгуків (друга з flip)
function renderTestimonials() {
  testimonialsGrid.innerHTML = '';
  testimonials.forEach((t, idx) => {
    if (t.hasFlip) {
      // Спеціальна flip-картка (друга)
      const card = document.createElement('div');
      card.className = 'testimonial-card flip-card';
      card.setAttribute('data-entry', t.entryAnim);
      card.classList.add('animate-in');
      card.style.height = '340px';
      card.style.width = '280px';
      const avatarSrc = `image/avatar.png?v=${t.id}`;
      card.innerHTML = `
                    <div class="flip-container" style="width:100%; height:100%;">
                        <div class="flipper" id="flipper-${t.id}">
                            <div class="front">
                                <div class="avatar">
                                    <img src="${avatarSrc}" alt="avatar" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\'avatar-fallback\'>👤</div>';">
                                </div>
                                <div class="client-name">${t.name}</div>
                                <div class="review-text">“${t.review}”</div>
                                <div class="rating">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                            </div>
                            <div class="back">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎁</div>
                                <div class="client-name" style="color:#e67e22;">Секретний подарунок!</div>
                                <div class="review-text" style="color:#2c3e4e;">${t.backText}</div>
                                <div class="extra-message">Наведіть щоб побачити зворотній бік ✨</div>
                            </div>
                        </div>
                    </div>
                `;
      testimonialsGrid.appendChild(card);
      // Додаємо подію наведення для flip
      const flipper = card.querySelector('.flipper');
      card.addEventListener('mouseenter', () => {
        if (flipper) flipper.style.transform = 'rotateY(180deg)';
      });
      card.addEventListener('mouseleave', () => {
        if (flipper) flipper.style.transform = 'rotateY(0deg)';
      });
    } else {
      // Звичайні 3D картки без flip, але з hover-ефектами
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.setAttribute('data-anim', t.animHover);
      card.setAttribute('data-entry', t.entryAnim);
      card.classList.add('animate-in');
      card.style.width = '280px';
      card.style.height = '340px';
      const avatarSrc = `image/avatar.png?v=${t.id}`;
      card.innerHTML = `
                    <div class="testimonial-inner">
                        <div class="avatar">
                            <img src="${avatarSrc}" alt="avatar" onerror="this.onerror=null; this.parentElement.querySelector('.avatar').innerHTML='<div class=\'avatar-fallback\'>👤</div>';">
                        </div>
                        <div class="client-name">${t.name}</div>
                        <div class="review-text">“${t.review}”</div>
                        <div class="rating">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                    </div>
                `;
      testimonialsGrid.appendChild(card);
    }
  });
}

// Глобальний клік на корзину
document.getElementById('globalCartWrapper')?.addEventListener('click', () => {
  if (totalCount === 0)
    showToast('🛒 Кошик порожній, оберіть магічний товар!', false);
  else
    showToast(
      `📦 У кошику ${totalCount} товар(ів) на суму ${totalPrice} ₴`,
      true,
    );
  const wrap = document.getElementById('globalCartWrapper');
  wrap.style.transform = 'scale(0.95)';
  setTimeout(() => {
    if (wrap) wrap.style.transform = '';
  }, 150);
});

renderProducts();
renderTestimonials();
updateCartUI();
