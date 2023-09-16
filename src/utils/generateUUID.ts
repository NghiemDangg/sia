const generateUUID = (): string => {
  const tempUrl = URL.createObjectURL(new Blob())

  const uuid = tempUrl.toString()

  URL.revokeObjectURL(tempUrl)

  return uuid.substring(uuid.lastIndexOf('/') + 1).trim()
}

export default generateUUID
