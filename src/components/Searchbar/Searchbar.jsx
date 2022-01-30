import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Searchbar = ({ onSubmit }) => {
  const [searchImage, setSearchImage] = useState('');

  // при изменении значения инпута, значение записывается в стейт
  const handleNameChange = event => {
    setSearchImage(event.currentTarget.value.toLowerCase());
  };

  // при сабмите формы вызываю метод handleFormSubmit и передаю ему значение искомого изображения
  // при нажатии на серч, значение запроса очищается
  const handleSubmit = event => {
    event.preventDefault();

    if (searchImage === ''.trim()) {
      return toast.error('Введите данные для запроса.');
    }

    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleNameChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;