export default function copyToClipboard(content: string): void {
  if (window.navigator.clipboard && navigator.permissions) {
    navigator.clipboard.writeText(content)
  } else if (document.queryCommandSupported('copy')) {
    const el = document.createElement('textarea')
    el.value = content
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}
