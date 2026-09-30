import { useEffect } from 'react'

export function useOutsideClick(ref, isOpen, onClose) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose(false)
    }
    if (isOpen) window.addEventListener('mousedown', handleOutsideClick)
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [ref, isOpen, onClose])
}
