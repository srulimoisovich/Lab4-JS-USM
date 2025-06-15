/**
 * Форматирует дату в человекочитаемый вид
 * @param {Date} date - Объект Date
 * @returns {string} - Отформатированная строка даты
 */
export function formatDate(date) {
    return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}
