import type { AppDispatch } from '@/types/store'

import { useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
