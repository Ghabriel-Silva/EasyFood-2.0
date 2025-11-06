export function toMoney(value: number | undefined | null): number {
    const nun =Number(value) || 0
    return Number((nun ?? 0).toFixed(2))
}