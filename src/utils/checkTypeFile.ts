import type { UploadFile } from 'antd/lib/upload'

import { message } from 'antd'

/**
 * @param file
 * @param arrayTypeCheck
 * @param typeFile 'IMAGE', ... default Image
 * @returns
 */

function checkTypeFile(
  file: File | UploadFile<HTMLInputElement | File>,
  arrayTypeCheck: string[],
  typeFile?: string,
): boolean {
  let flag = false

  if (!typeFile) {
    arrayTypeCheck.forEach((item) => {
      if (file.type?.trim().includes(item.trim())) {
        flag = true

        return flag
      }
    })
  }

  if (!flag) {
    let messageString = ''

    arrayTypeCheck.forEach((item, index) => {
      messageString += item.trim()

      if (index < arrayTypeCheck.length - 1) {
        messageString += ', '
      }
    })

    message.warning(messageString)
  }

  return flag
}

export default checkTypeFile
