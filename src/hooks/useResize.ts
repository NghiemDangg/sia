import type { EffectCallback } from 'react'

import { useEffect, useState } from 'react'

const useResize = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0)
  const [screenHeight, setScreenHeight] = useState<number>(0)

  const handleResize = (): void => {
    setScreenWidth(document.documentElement.clientWidth)
    setScreenHeight(document.documentElement.clientHeight)
  }

  useEffect((): ReturnType<EffectCallback> => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { screenWidth, screenHeight, setScreenWidth, setScreenHeight }
}

export default useResize
