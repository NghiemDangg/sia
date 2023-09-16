import { useRouter } from 'next/router'

import { DEFAULT_LANGUAGE } from '@/config/constants'

import en from '@/assets/locales/en'
import vi from '@/assets/locales/vi'

const useTranslate = () => {
  const { locale } = useRouter()

  return locale === DEFAULT_LANGUAGE ? vi : en
}

export default useTranslate
