const transactions = [];

/**
 * Генерация уникального ID для транзакции
 * @returns {string} - Уникальный ID
 */
const generateId = () => `t${Date.now()}`;

/**
 * Добавляет новую транзакцию в массив
 * @param {Object} transaction - Объект транзакции
 */
export function addTransaction(transaction) {
    transactions.push(transaction);
}

/**
 * Удаляет транзакцию по ID
 * @param {string} id - ID транзакции
 */
export function removeTransaction(id) {
    const index = transactions.findIndex(tx => tx.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
    }
}

/**
 * Получает все транзакции
 * @returns {Array} - Список транзакций
 */
export function getTransactions() {
    return transactions;
}
