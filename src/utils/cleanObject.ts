const cleanObject = (obj: { [key: string]: any }) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined || String(obj[key]).trim() === '') {
      delete obj[key]
    }
  }

  return obj
}

export default cleanObject
