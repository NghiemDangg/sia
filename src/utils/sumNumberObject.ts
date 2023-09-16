function sumObjectNumber(obj: any) {
  var sum = 0
  for (var el in obj) {
    if (obj.hasOwnProperty(el) && el !== 'value') {
      sum += parseFloat(obj[el])
    }
  }
  return sum
}

export default sumObjectNumber
