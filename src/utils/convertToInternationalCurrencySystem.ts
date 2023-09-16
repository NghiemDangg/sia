const convertToInternationalCurrencySystem = (value: number): string | number => {
  // Nine Zeroes for Billions
  return Math.abs(+value) >= 1.0e9
    ? (Math.abs(+value) / 1.0e9).toFixed(2) + 'B'
    : // Six Zeroes for Millions
    Math.abs(+value) >= 1.0e6
    ? (Math.abs(+value) / 1.0e6).toFixed(2) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(+value) >= 1.0e3
    ? (Math.abs(+value) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(+value)
}

export default convertToInternationalCurrencySystem
