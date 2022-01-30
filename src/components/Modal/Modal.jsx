import { useEffect } from 'react';

const Modal = ({ largeImageURL, onClose }) => {
  // при монтировании компонента вешаем слушатель событий
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // перед размонтированием сними колбэк
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // при клике на ескейп вызываем функцию тоглмодал из галереи и закрываем модалку
  function handleKeyDown(event) {
    if (event.code === 'Escape') {
      onClose();
    }
  }
  // проверяем клик именно набекдроп вызываем функцию тоглмодал из галереи и закрываем модалку
  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }
  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
