import { addTransaction } from "./transactions.js";
import { renderTransactions } from "./ui.js";

/**
 * Валидация формы перед отправкой
 * @param {HTMLFormElement} form - Форма с транзакцией
 * @returns {boolean} - Возвращает true, если форма валидна
 */
function validateForm(form) {
    let isValid = true;

    // Очищаем предыдущие ошибки
    document.querySelectorAll(".error-message").forEach(el => el.remove());

    const amount = form.amount.value.trim();
    const category = form.category.value.trim();
    const description = form.description.value.trim();

    if (!amount || isNaN(amount) || parseFloat(amount) === 0) {
        showError(form.amount, "Введите корректную сумму (не 0).");
        isValid = false;
    }

    if (!category) {
        showError(form.category, "Выберите категорию.");
        isValid = false;
    }

    if (!description || description.length > 100) {
        showError(form.description, "Описание не должно быть пустым и длиннее 100 символов.");
        isValid = false;
    }

    return isValid;
}

/**
 * Отображает сообщение об ошибке под полем
 * @param {HTMLElement} input - Поле ввода
 * @param {string} message - Текст ошибки
 */
function showError(input, message) {
    const error = document.createElement("div");
    error.classList.add("error-message");
    error.textContent = message;
    error.style.color = "red";
    error.style.fontSize = "12px";
    error.style.marginTop = "5px";
    input.parentElement.appendChild(error);
}

/**
 * Обрабатывает отправку формы
 * @param {Event} event - Событие формы
 */
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (!validateForm(form)) return;

    const transaction = {
        id: `t${Date.now()}`,
        date: new Date().toLocaleString(),
        amount: parseFloat(form.amount.value),
        category: form.category.value,
        description: form.description.value,
    };

    form.reset();

    addTransaction(transaction);
    renderTransactions();
    updateTotal();
}

document.querySelector("#transaction-form").addEventListener("submit", handleFormSubmit);
