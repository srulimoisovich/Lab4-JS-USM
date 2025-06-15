import { getTransactions, removeTransaction } from "./transactions.js";

/**
 * Подсчитывает общую сумму всех транзакций и обновляет интерфейс.
 * Находит элемент с id="total" и обновляет его содержимое.
 */
export function updateTotal() {
    const total = getTransactions().reduce(
        /**
         * @param {number} sum - Текущая сумма всех транзакций
         * @param {Object} transaction - Текущая транзакция
         * @param {number} transaction.amount - Сумма транзакции
         * @returns {number} - Обновленная сумма
         */
        (sum, transaction) => sum + transaction.amount,
        0
    );

    document.querySelector("#total").textContent = total.toFixed(2);
}

/**
 * Отображает список транзакций в таблице.
 * Очищает текущую таблицу и заполняет ее данными из массива транзакций.
 */
export function renderTransactions() {
    const tableBody = document.querySelector("#transactions tbody");
    tableBody.innerHTML = ""; // Очистка перед перерисовкой

    getTransactions().forEach(
        /**
         * @param {Object} transaction - Объект транзакции
         * @param {string} transaction.id - Уникальный идентификатор транзакции
         * @param {string} transaction.date - Дата транзакции
         * @param {string} transaction.category - Категория транзакции
         * @param {string} transaction.description - Описание транзакции
         * @param {number} transaction.amount - Сумма транзакции
         */
        transaction => {
            const row = document.createElement("tr");
            row.setAttribute("data-description", transaction.description); // Полное описание
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.category}</td>
                <td>${getShortDescription(transaction.description)}</td>
                <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
            `;
            row.style.backgroundColor = transaction.amount >= 0 ? "darkgreen" : "darkred";
            tableBody.appendChild(row);
        }
    );

    updateTotal(); // Пересчет суммы при обновлении списка
}

/**
 * Возвращает краткое описание транзакции (первые 4 слова).
 * @param {string} description - Полное описание транзакции
 * @returns {string} - Сокращенное описание в формате "первые 4 слова..."
 */
function getShortDescription(description) {
    return description.split(" ").slice(0, 4).join(" ") + "...";
}

// Делегирование события для удаления транзакции
document.querySelector("#transactions").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        /**
         * @type {string} id - Уникальный идентификатор удаляемой транзакции
         */
        const id = event.target.dataset.id;
        removeTransaction(id);
        renderTransactions();
        updateTotal(); // Обновление суммы после удаления
    }
});

/**
 * Делегирование событий для отображения полного описания транзакции
 */
document.querySelector("#transactions tbody").addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") { // Исключаем клик по кнопке удаления
        const row = event.target.closest("tr");
        const description = row.dataset.description;
        document.querySelector("#full-description").textContent = description || "Нет описания";
    }
});
