const exportToExcel = (payload: any, fileName?: string) => {
  // If you want to download file automatically using link attribute.
  const link = document.createElement('a')

  link.href = URL.createObjectURL(new Blob([payload as unknown as Blob]))

  link.setAttribute('download', `${fileName ?? Date.now()}.xlsx`)

  document.body.appendChild(link)

  link.click()

  link.parentNode?.removeChild(link)
}

export default exportToExcel
