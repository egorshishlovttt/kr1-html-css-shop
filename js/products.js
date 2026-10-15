// Единый список товаров. Страница product.html берёт отсюда данные
// по параметру ?id=N и подставляет их в разметку.

const PRODUCTS = [
  {
    id: 1,
    name: 'Беспроводные наушники',
    category: 'audio',
    categoryLabel: 'Аудио',
    badge: { text: 'Хит продаж', modifier: 'hit' },
    price: 2990,
    oldPrice: null,
    rating: 4.8,
    inStock: true,
    image: 'images/product-1.svg',
    alt: 'Беспроводные наушники чёрного цвета, вид спереди',
    caption: 'Беспроводные наушники, цвет «чёрный»',
    description: 'Полноразмерные беспроводные наушники с активным шумоподавлением. До 30 часов работы от одного заряда, быстрая зарядка за 10 минут даёт ещё 5 часов музыки. Складная конструкция и чехол в комплекте.',
    features: ['Активное шумоподавление', 'Bluetooth 5.3, подключение к двум устройствам', 'Микрофон с подавлением ветра'],
    specs: [
      ['Тип', 'Полноразмерные, закрытые'],
      ['Подключение', 'Bluetooth 5.3, кабель 3,5 мм'],
      ['Время работы', 'до 30 часов'],
      ['Вес', '250 г'],
      ['Гарантия', '12 месяцев'],
    ],
    reviews: [
      { initials: 'АК', author: 'Анна К.', date: '2026-09-28', dateText: '28 сентября 2026', rating: 5, text: 'Шумоподавление реально работает: в метро музыку слышно без прибавления громкости.' },
      { initials: 'ИП', author: 'Игорь П.', date: '2026-10-06', dateText: '6 октября 2026', rating: 4, text: 'Звук и батарея отличные, но амбушюры немного давят после двух часов.' },
    ],
    related: [7, 3, 8],
  },
  {
    id: 2,
    name: 'Рюкзак для ноутбука',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    badge: null,
    price: 3490,
    oldPrice: null,
    rating: 4.6,
    inStock: true,
    image: 'images/product-2.svg',
    alt: 'Зелёный рюкзак для ноутбука',
    caption: 'Рюкзак для ноутбука, цвет «зелёный»',
    description: 'Городской рюкзак с мягким отделением для ноутбука до 15,6 дюйма. Влагозащитная ткань, потайной карман на спинке, лямки с сетчатой подкладкой и ремень для крепления к чемодану.',
    features: ['Отделение для ноутбука 15,6"', 'Влагозащитная ткань', 'Потайной карман на спинке'],
    specs: [
      ['Объём', '22 л'],
      ['Материал', 'Полиэстер 900D'],
      ['Размер ноутбука', 'до 15,6"'],
      ['Вес', '780 г'],
      ['Гарантия', '24 месяца'],
    ],
    reviews: [
      { initials: 'ДМ', author: 'Дмитрий М.', date: '2026-10-03', dateText: '3 октября 2026', rating: 4, text: 'Рюкзак удобный, ноутбук помещается с запасом. Снял одну звезду за доставку.' },
      { initials: 'ОЛ', author: 'Ольга Л.', date: '2026-10-09', dateText: '9 октября 2026', rating: 5, text: 'Попала под дождь — внутри всё сухое. Лямки не натирают даже с тяжёлой загрузкой.' },
    ],
    related: [9, 5, 6],
  },
  {
    id: 3,
    name: 'Смарт-часы',
    category: 'gadgets',
    categoryLabel: 'Гаджеты',
    badge: { text: 'Новинка', modifier: 'new' },
    price: 5990,
    oldPrice: null,
    rating: 4.5,
    inStock: true,
    image: 'images/product-3.svg',
    alt: 'Смарт-часы с фиолетовым ремешком',
    caption: 'Смарт-часы, ремешок «фиолетовый»',
    description: 'Часы с AMOLED-экраном, датчиком пульса и кислорода в крови. Показывают уведомления с телефона, считают шаги и сон. До 7 дней работы без подзарядки.',
    features: ['Пульс и SpO2 круглосуточно', 'Уведомления и управление музыкой', 'Водозащита 5 ATM'],
    specs: [
      ['Экран', 'AMOLED 1,43", 466×466'],
      ['Автономность', 'до 7 дней'],
      ['Водозащита', '5 ATM'],
      ['Вес', '38 г'],
      ['Гарантия', '12 месяцев'],
    ],
    reviews: [
      { initials: 'СВ', author: 'Сергей В.', date: '2026-10-01', dateText: '1 октября 2026', rating: 5, text: 'Заряжаю раз в неделю, экран яркий даже на солнце.' },
      { initials: 'МН', author: 'Мария Н.', date: '2026-10-11', dateText: '11 октября 2026', rating: 4, text: 'Шаги считает точно, но приложение иногда долго синхронизируется.' },
    ],
    related: [8, 4, 1],
  },
  {
    id: 4,
    name: 'Механическая клавиатура',
    category: 'gadgets',
    categoryLabel: 'Гаджеты',
    badge: { text: 'Скидка', modifier: 'discount' },
    price: 4490,
    oldPrice: 5490,
    rating: 4.7,
    inStock: true,
    image: 'images/product-4.svg',
    alt: 'Механическая клавиатура компактного формата',
    caption: 'Механическая клавиатура, формат 75 %',
    description: 'Компактная клавиатура формата 75 % с тихими линейными переключателями и белой подсветкой. Работает по проводу и по Bluetooth, запоминает три устройства.',
    features: ['Тихие линейные переключатели', 'Проводное и Bluetooth-подключение', 'Подсветка с регулировкой яркости'],
    specs: [
      ['Формат', '75 %, 84 клавиши'],
      ['Переключатели', 'Линейные, 45 г'],
      ['Подключение', 'USB-C, Bluetooth 5.0'],
      ['Вес', '720 г'],
      ['Гарантия', '12 месяцев'],
    ],
    reviews: [
      { initials: 'ПК', author: 'Павел К.', date: '2026-09-30', dateText: '30 сентября 2026', rating: 5, text: 'Печатать приятно, соседи по офису не жалуются на шум.' },
      { initials: 'АР', author: 'Алина Р.', date: '2026-10-08', dateText: '8 октября 2026', rating: 4, text: 'Со скидкой — отличная цена. Хотелось бы русские буквы на клавишах покрупнее.' },
    ],
    related: [8, 3, 6],
  },
  {
    id: 5,
    name: 'Термокружка',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    badge: { text: 'Новинка', modifier: 'new' },
    price: 990,
    oldPrice: null,
    rating: 4.4,
    inStock: true,
    image: 'images/product-5.svg',
    alt: 'Термокружка с ручкой',
    caption: 'Термокружка, объём 450 мл',
    description: 'Стальная термокружка с двойными стенками: держит тепло до 6 часов, холод — до 12. Крышка с клапаном не протекает в сумке.',
    features: ['Держит тепло 6 часов', 'Герметичная крышка', 'Подходит для автомобильного подстаканника'],
    specs: [
      ['Объём', '450 мл'],
      ['Материал', 'Нержавеющая сталь 18/8'],
      ['Сохранение тепла', 'до 6 часов'],
      ['Вес', '320 г'],
      ['Гарантия', '12 месяцев'],
    ],
    reviews: [
      { initials: 'ЕС', author: 'Елена С.', date: '2026-10-10', dateText: '10 октября 2026', rating: 5, text: 'Кофе горячий до обеда. Крышка правда не течёт.' },
      { initials: 'НГ', author: 'Никита Г.', date: '2026-10-12', dateText: '12 октября 2026', rating: 4, text: 'Хорошая кружка, но мыть ручку изнутри неудобно.' },
    ],
    related: [2, 9, 6],
  },
  {
    id: 6,
    name: 'Настольная лампа',
    category: 'home',
    categoryLabel: 'Для дома',
    badge: { text: 'Хит продаж', modifier: 'hit' },
    price: 1790,
    oldPrice: null,
    rating: 4.9,
    inStock: true,
    image: 'images/product-6.svg',
    alt: 'Настольная лампа с конусным абажуром',
    caption: 'Настольная лампа, цвет «жёлтый»',
    description: 'Светодиодная лампа с тремя режимами яркости и тёплым светом без мерцания. Гибкая ножка позволяет направить свет на книгу или клавиатуру.',
    features: ['Три режима яркости', 'Свет без мерцания', 'Сенсорное включение'],
    specs: [
      ['Мощность', '8 Вт'],
      ['Цветовая температура', '3000 K'],
      ['Питание', 'USB-C'],
      ['Вес', '540 г'],
      ['Гарантия', '24 месяца'],
    ],
    reviews: [
      { initials: 'ЕС', author: 'Елена С.', date: '2026-10-10', dateText: '10 октября 2026', rating: 5, text: 'Глаза не устают, свет мягкий. Нашла её через фильтр по цене.' },
      { initials: 'ВТ', author: 'Виктор Т.', date: '2026-10-13', dateText: '13 октября 2026', rating: 5, text: 'Стоит на рабочем столе уже месяц, ни одной претензии.' },
    ],
    related: [5, 2, 4],
  },
  {
    id: 7,
    name: 'Портативная колонка',
    category: 'audio',
    categoryLabel: 'Аудио',
    badge: { text: 'Скидка', modifier: 'discount' },
    price: 2490,
    oldPrice: 2990,
    rating: 4.3,
    inStock: true,
    image: 'images/product-7.svg',
    alt: 'Портативная колонка в вертикальном корпусе',
    caption: 'Портативная колонка, цвет «бирюзовый»',
    description: 'Компактная колонка с защитой от брызг и 12 часами музыки от одного заряда. Две колонки можно объединить в стереопару.',
    features: ['Защита от брызг IPX5', '12 часов работы', 'Стереопара из двух колонок'],
    specs: [
      ['Мощность', '10 Вт'],
      ['Автономность', 'до 12 часов'],
      ['Защита', 'IPX5'],
      ['Вес', '480 г'],
      ['Гарантия', '12 месяцев'],
    ],
    reviews: [
      { initials: 'ДМ', author: 'Дмитрий М.', date: '2026-10-05', dateText: '5 октября 2026', rating: 4, text: 'Для своей цены звучит громко и чисто, баса чуть не хватает.' },
      { initials: 'КИ', author: 'Кирилл И.', date: '2026-10-14', dateText: '14 октября 2026', rating: 5, text: 'Брал на дачу — дождь пережила, заряда хватило на весь день.' },
    ],
    related: [1, 3, 8],
  },
  {
    id: 8,
    name: 'Беспроводная мышь',
    category: 'gadgets',
    categoryLabel: 'Гаджеты',
    badge: null,
    price: 1290,
    oldPrice: null,
    rating: 4.6,
    inStock: true,
    image: 'images/product-8.svg',
    alt: 'Беспроводная мышь серого цвета',
    caption: 'Беспроводная мышь, цвет «серый»',
    description: 'Бесшумная мышь с симметричной формой и точным сенсором. Одной батарейки AA хватает на год, подключение по USB-приёмнику или Bluetooth.',
    features: ['Бесшумные кнопки', 'Год работы от одной батарейки', 'USB-приёмник и Bluetooth'],
    specs: [
      ['Сенсор', 'Оптический, 1600 DPI'],
      ['Подключение', 'USB 2,4 ГГц, Bluetooth'],
      ['Питание', '1 × AA'],
      ['Вес', '95 г'],
      ['Гарантия', '12 месяцев'],
    ],
    reviews: [
      { initials: 'ПК', author: 'Павел К.', date: '2026-10-02', dateText: '2 октября 2026', rating: 5, text: 'Кликов не слышно вообще. Отличный вариант для библиотеки.' },
      { initials: 'ТА', author: 'Татьяна А.', date: '2026-10-07', dateText: '7 октября 2026', rating: 4, text: 'Удобная, но для большой ладони немного маловата.' },
    ],
    related: [4, 3, 9],
  },
  {
    id: 9,
    name: 'Чехол для ноутбука',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    badge: { text: 'Нет в наличии', modifier: 'muted' },
    price: 1190,
    oldPrice: null,
    rating: 4.2,
    inStock: false,
    image: 'images/product-9.svg',
    alt: 'Мягкий чехол для ноутбука',
    caption: 'Чехол для ноутбука 13–14"',
    description: 'Мягкий чехол из неопрена с внешним карманом для зарядки и мыши. Подходит для ноутбуков с диагональю 13–14 дюймов.',
    features: ['Неопрен толщиной 5 мм', 'Карман для зарядного устройства', 'Молния с двумя бегунками'],
    specs: [
      ['Диагональ ноутбука', '13–14"'],
      ['Материал', 'Неопрен'],
      ['Внутренний размер', '345 × 245 мм'],
      ['Вес', '180 г'],
      ['Гарантия', '6 месяцев'],
    ],
    reviews: [
      { initials: 'ОЛ', author: 'Ольга Л.', date: '2026-09-25', dateText: '25 сентября 2026', rating: 4, text: 'Ноутбук сидит плотно, карман вместил зарядку и мышь.' },
      { initials: 'НГ', author: 'Никита Г.', date: '2026-10-04', dateText: '4 октября 2026', rating: 4, text: 'Нормальный чехол, жаль, что сейчас нет в наличии — брал бы второй.' },
    ],
    related: [2, 5, 8],
  },
];

/* ===================================
   Страница товара: подстановка данных по ?id=
   =================================== */

const productPage = document.querySelector('.product');

if (productPage) {
  const formatPrice = (value) => `${value.toLocaleString('ru-RU')} руб.`;

  const stars = (rating) => {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  };

  const reviewsWord = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'отзыва';
    return 'отзывов';
  };

  // Карточка товара для блока «Похожие товары».
  const renderCard = (product) => {
    const card = document.createElement('article');
    card.className = `product-card${product.badge ? ` product-card--${product.badge.modifier}` : ''}${product.inStock ? '' : ' product-card--out-of-stock'}`;

    const badge = product.badge
      ? `<span class="product-card__badge product-card__badge--${product.badge.modifier}">${product.badge.text}</span>`
      : '';

    const oldPrice = product.oldPrice
      ? `<s class="product-card__old-price">${formatPrice(product.oldPrice)}</s> `
      : '';

    card.innerHTML = `
      ${badge}
      <div class="product-card__media">
        <img class="product-card__image" src="${product.image}" alt="${product.name}" width="400" height="300" loading="lazy">
      </div>
      <p class="product-card__category">${product.categoryLabel}</p>
      <h3 class="product-card__title">
        <a class="product-card__link" href="product.html?id=${product.id}">${product.name}</a>
      </h3>
      <p class="product-card__description">${product.features[0]}.</p>
      <p class="product-card__price">${oldPrice}${formatPrice(product.price)}</p>
    `;

    return card;
  };

  const renderReview = (review) => {
    const article = document.createElement('article');
    article.className = 'review';
    article.innerHTML = `
      <header class="review__header">
        <span class="review__avatar" aria-hidden="true">${review.initials}</span>
        <div class="review__meta">
          <p class="review__author">${review.author}</p>
          <time class="review__date" datetime="${review.date}">${review.dateText}</time>
        </div>
      </header>
      <p class="review__rating" aria-label="Оценка ${review.rating} из 5">${stars(review.rating)}</p>
      <p class="review__text">${review.text}</p>
    `;
    return article;
  };

  const renderProduct = (product) => {
    const byId = (id) => document.getElementById(id);

    document.title = `${product.name} — Учебный интернет-магазин`;
    document.querySelector('meta[name="description"]').content =
      `${product.name}: описание, характеристики, цена, отзывы и форма заявки в учебном интернет-магазине.`;

    byId('breadcrumb-current').textContent = product.name;

    const image = byId('product-image');
    image.src = product.image;
    image.alt = product.alt;
    byId('product-caption').textContent = product.caption;

    byId('product-category').textContent = product.categoryLabel;
    byId('product-title').textContent = product.name;

    const badge = byId('product-badge');
    if (product.badge) {
      badge.textContent = product.badge.text;
      badge.className = `product__badge product__badge--${product.badge.modifier}`;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }

    const starsOutput = byId('product-stars');
    starsOutput.textContent = stars(product.rating);
    starsOutput.setAttribute('aria-label', `Оценка ${product.rating.toLocaleString('ru-RU')} из 5`);
    byId('product-rating-value').textContent = product.rating.toLocaleString('ru-RU');
    byId('product-rating-link').textContent = `${product.reviews.length} ${reviewsWord(product.reviews.length)}`;

    const oldPrice = byId('product-old-price');
    if (product.oldPrice) {
      oldPrice.textContent = formatPrice(product.oldPrice);
      oldPrice.hidden = false;
    } else {
      oldPrice.hidden = true;
    }
    byId('product-price-value').textContent = formatPrice(product.price);

    const availability = byId('product-availability');
    availability.textContent = product.inStock ? 'В наличии, доставка 1–2 дня' : 'Нет в наличии';
    availability.className = `product__availability product__availability--${product.inStock ? 'in-stock' : 'out-of-stock'}`;

    byId('product-description').textContent = product.description;

    const features = byId('product-features');
    features.replaceChildren(...product.features.map((text) => {
      const li = document.createElement('li');
      li.className = 'product__feature';
      li.textContent = text;
      return li;
    }));

    const orderButton = byId('product-order');
    orderButton.dataset.product = product.name;
    orderButton.disabled = !product.inStock;

    const specsBody = byId('product-specs');
    const rows = [
      ['Категория', product.categoryLabel],
      ...product.specs,
      ['Цена', formatPrice(product.price)],
      ['Наличие', product.inStock ? 'В наличии' : 'Нет в наличии'],
    ];
    specsBody.replaceChildren(...rows.map(([name, value]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="product-table__cell">${name}</td><td class="product-table__cell">${value}</td>`;
      return tr;
    }));

    byId('product-reviews-list').replaceChildren(...product.reviews.map(renderReview));

    const related = product.related
      .map((id) => PRODUCTS.find((item) => item.id === id))
      .filter(Boolean);
    byId('related-grid').replaceChildren(...related.map(renderCard));
  };

  const requestedId = Number(new URLSearchParams(window.location.search).get('id'));
  const product = PRODUCTS.find((item) => item.id === requestedId) || PRODUCTS[0];

  renderProduct(product);
}
