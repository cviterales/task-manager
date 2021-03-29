import { useState, useRef, useEffect } from 'react'

function useVisible(initialIsVisible) {
  const [isVisible, setIsVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('scroll', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.addEventListener('scroll', handleClickOutside, true)
    }
  }, [])

  return { ref, isVisible, setIsVisible }
}

export default useVisible
