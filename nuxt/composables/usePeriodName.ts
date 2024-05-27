export const usePeriodName = (start?: string, end?: string) => {
  return [start, end]
    .filter(period => period)
    .join(' - ');
}
