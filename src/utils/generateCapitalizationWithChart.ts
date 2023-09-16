function generateCapitalizationWithChart(str: string): string {
  let result: string = ''

  str
    .trim()
    .split(/\s+/g)
    .forEach((item) => {
      if (item) {
        result += item.charAt(0).toUpperCase() + ' '
      }
    })

  return result.trim()
}

export default generateCapitalizationWithChart
