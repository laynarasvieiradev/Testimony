import { useEffect } from 'react'
import './Overlay.css'

const Overlay = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey)
      document.body.classList.add('overlay-open')
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey)
      document.body.classList.remove('overlay-open')
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="overlay-backdrop" onClick={handleBackdropClick}>
      <div className="overlay-content">
        <div className="overlay-children">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Overlay