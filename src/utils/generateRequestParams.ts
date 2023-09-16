import cleanObject from './cleanObject'

/**
 * @param objectReq
 * @returns string
 */

const generateRequestParams = (objectReq: { [key: string]: any }): string => {
  let reqParamResult = ''

  Object.keys(cleanObject(objectReq)).forEach((item, index) => {
    if (objectReq[item] || objectReq[item] === 0 || objectReq[item] === false) {
      if (index <= 0) {
        reqParamResult += `?${item}=${objectReq[item]}`
      } else {
        reqParamResult += `&${item}=${objectReq[item]}`
      }
    }
  })

  return reqParamResult
}

export default generateRequestParams
