import type { FormInstance } from 'antd'

/**
 * @param objectData
 * @param options
 */
const processFormDataBeforeSubmitted = (
  objectData: { [key: string]: any },
  options?: {
    formInstance?: FormInstance<any>
    trimWhitespace?: boolean
    trimEndWhitespace?: boolean
    trimStartWhitespace?: boolean
    convertToNumber?: boolean
  },
): { [key: string]: any } => {
  Object.keys(objectData).forEach((itemKey) => {
    if (typeof objectData[itemKey] === 'string') {
      /**
       * Remove white space
       */
      if (!options) {
        //  Default remove white space start and end

        objectData[itemKey] = String(objectData[itemKey]).trim()
      } else if (options) {
        /**
         * Remove white space
         */
        if (
          options.trimWhitespace ||
          (!options.trimWhitespace &&
            options.trimStartWhitespace === undefined &&
            options.trimEndWhitespace === undefined)
        ) {
          //  Default remove start and end white space

          objectData[itemKey] = String(objectData[itemKey]).trim()
        } else if (options.trimStartWhitespace) {
          // Remove start white space

          objectData[itemKey] = String(objectData[itemKey]).trimStart()
        } else if (options.trimEndWhitespace) {
          // Remove end white space

          objectData[itemKey] = String(objectData[itemKey]).trimEnd()
        }
      }
    }

    if (options) {
      if (/\d+/.test(String(objectData[itemKey]).trim()) && options.convertToNumber) {
        // convert to number

        objectData[itemKey] = Number(String(objectData[itemKey]).trim())
      }
    }
  })

  if (options) {
    if (options.formInstance) {
      options.formInstance.setFieldsValue(objectData)
    }
  }

  return objectData
}

export default processFormDataBeforeSubmitted
