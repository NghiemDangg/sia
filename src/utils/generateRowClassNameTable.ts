const generateRowClassNameTable = <T>(_: T, index: number): string => {
  if (!(index % 2 === 0)) {
    return 'active'
  }

  return ''
}

export default generateRowClassNameTable
