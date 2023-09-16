const sumNumberArray = (numberArray: number[], initialValue?: number): number => {
  return numberArray.reduce((prevValue, currentValue) => (prevValue += currentValue), initialValue || 0)
}

export default sumNumberArray
