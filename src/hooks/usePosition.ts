const usePosition = (obj: any) => {
  var currenttop = -80 // => chiều cao của header
  if (obj.offsetParent) {
    do {
      currenttop += obj.offsetTop
    } while ((obj = obj.offsetParent))
    return currenttop
  }
  return 0
}

export default usePosition
