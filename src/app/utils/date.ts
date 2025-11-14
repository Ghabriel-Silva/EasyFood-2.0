export function getBrazilDayRangeFromDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 a 11
    const day = date.getDate();

    // Considerando fuso UTC-3
    const start = new Date(Date.UTC(year, month, day, 3, 0, 0, 0)); // 06/11 00:00 BR = 03:00 UTC
    const end = new Date(Date.UTC(year, month, day + 1, 2, 59, 59, 999)); // 06/11 23:59:59 BR = 02:59:59 UTC do dia seguinte

    return { start, end };
}