const formatNumber = (number: number, locale?: string, option?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(locale ?? 'VND', {
    ...option,
    currency: option?.currency ?? 'VND',
  }).format(number)
}

export default formatNumber
