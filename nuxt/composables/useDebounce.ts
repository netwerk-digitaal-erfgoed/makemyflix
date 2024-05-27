export const useDebounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction (...args) {
    const later = () => {
      timeout = null
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
