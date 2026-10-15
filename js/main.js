// Скрипт подключается на всех страницах, поэтому каждый блок
// сначала проверяет, что нужные элементы есть на текущей странице.

/* ===================================
   1. Модальное окно заявки
   =================================== */

const orderDialog = document.getElementById('order-dialog');

if (orderDialog) {
  const orderForm = document.getElementById('order-form');
  const selectedProductInput = document.getElementById('selected-product');
  const productLine = document.getElementById('order-dialog-product');
  const productNameOutput = document.getElementById('order-dialog-product-name');
  const topicSelect = document.getElementById('order-topic');
  const closeButton = document.getElementById('close-order-dialog');
  const cancelButton = document.getElementById('cancel-order-dialog');
  const successMessage = document.getElementById('success-message');

  let successTimer = null;

  // Снимаем признаки ошибок и очищаем тексты ошибок под полями.
  const clearErrors = () => {
    Array.from(orderForm.elements).forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    orderForm.querySelectorAll('.order-form__error').forEach((error) => {
      error.textContent = '';
    });
  };

  // Показываем текст ошибки под конкретным полем.
  const showError = (element) => {
    element.setAttribute('aria-invalid', 'true');

    const error = document.getElementById(`${element.id}-error`);

    if (error) {
      error.textContent = element.validationMessage;
    }
  };

  // Открываем окно для выбранного товара.
  const openDialog = (productName) => {
    clearErrors();
    orderForm.reset();

    selectedProductInput.value = productName || '';

    if (productName) {
      productNameOutput.textContent = productName;
      productLine.hidden = false;

      // Если товар выбран, тема заявки по умолчанию — «Заказ товара».
      topicSelect.value = 'product';
    } else {
      productLine.hidden = true;
    }

    orderDialog.showModal();

    // Фокус сразу в первое поле формы.
    orderForm.elements.name.focus();
  };

  // Кнопки «Заказать» в карточках товаров.
  document.querySelectorAll('[data-product]').forEach((button) => {
    button.addEventListener('click', () => {
      openDialog(button.dataset.product);
    });
  });

  // Закрытие по крестику и по кнопке «Отмена».
  [closeButton, cancelButton].forEach((button) => {
    if (button) {
      button.addEventListener('click', () => orderDialog.close());
    }
  });

  // Закрытие по клику на подложку (вне содержимого окна).
  orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) {
      orderDialog.close();
    }
  });

  // Закрытие по Esc браузер делает сам; после любого закрытия чистим форму.
  orderDialog.addEventListener('close', () => {
    clearErrors();
    orderForm.reset();
  });

  // Ошибка пропадает, как только пользователь исправил поле.
  orderForm.addEventListener('input', (event) => {
    const element = event.target;

    if (element.willValidate && element.checkValidity()) {
      element.removeAttribute('aria-invalid');

      const error = document.getElementById(`${element.id}-error`);

      if (error) {
        error.textContent = '';
      }
    }
  });

  // Обрабатываем отправку формы.
  orderForm.addEventListener('submit', (event) => {
    // Backend пока не подключён — отменяем стандартную отправку.
    event.preventDefault();
    clearErrors();

    const formElements = Array.from(orderForm.elements);
    const invalidElements = formElements.filter(
      (element) => element.willValidate && !element.checkValidity()
    );

    if (invalidElements.length > 0) {
      invalidElements.forEach(showError);

      // Фокус в первое ошибочное поле.
      invalidElements[0].focus();
      return;
    }

    const productName = selectedProductInput.value;

    successMessage.textContent = productName
      ? `Заявка на «${productName}» отправлена! Мы свяжемся с вами.`
      : 'Форма успешно отправлена!';
    successMessage.hidden = false;

    // Сообщение само скрывается через 5 секунд.
    clearTimeout(successTimer);
    successTimer = setTimeout(() => {
      successMessage.hidden = true;
    }, 5000);

    orderDialog.close();
  });
}

/* ===================================
   2. Кнопка «Наверх»
   =================================== */

const toTopButton = document.getElementById('to-top');

if (toTopButton) {
  const SHOW_AFTER = 400; // пикселей прокрутки

  const toggleToTop = () => {
    toTopButton.classList.toggle('to-top--visible', window.scrollY > SHOW_AFTER);
  };

  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();

  toTopButton.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
}

/* ===================================
   3. Фильтр каталога
   =================================== */

const filtersForm = document.getElementById('filters-form');

if (filtersForm) {
  const cards = Array.from(document.querySelectorAll('#products-grid .product-card'));
  const countOutput = document.getElementById('filters-count');
  const emptyMessage = document.getElementById('products-empty');

  const applyFilters = () => {
    const data = new FormData(filtersForm);
    const categories = data.getAll('category');
    const priceFrom = Number(data.get('price-from')) || 0;
    const priceTo = Number(data.get('price-to')) || Infinity;
    const onlyDiscount = data.get('discount') === '1';

    let shown = 0;

    cards.forEach((card) => {
      const price = Number(card.dataset.price);
      const matchesCategory = categories.length === 0 || categories.includes(card.dataset.category);
      const matchesPrice = price >= priceFrom && price <= priceTo;
      const matchesDiscount = !onlyDiscount || card.dataset.discount === '1';
      const visible = matchesCategory && matchesPrice && matchesDiscount;

      card.classList.toggle('product-card--hidden', !visible);

      if (visible) {
        shown += 1;
      }
    });

    countOutput.textContent = `Показано товаров: ${shown} из ${cards.length}`;
    emptyMessage.hidden = shown > 0;
  };

  // Фильтр срабатывает сразу при изменении любого поля.
  filtersForm.addEventListener('input', applyFilters);

  filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters();
  });

  // reset сначала очищает поля, потом надо пересчитать список.
  filtersForm.addEventListener('reset', () => {
    setTimeout(applyFilters, 0);
  });

  applyFilters();
}

/* ===================================
   4. FAQ: открыт только один вопрос
   =================================== */

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((other) => {
      if (other !== item) {
        other.open = false;
      }
    });
  });
});
