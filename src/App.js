import './App.css';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

const App = () => {
  const [searchImage, setSearchImage] = useState('');
  const [page, setPage] = useState(1);

  // при сабмите формы записываем в стейт искомое значение
  const handleFormSubmit = searchImage => {
    setSearchImage(searchImage);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} setPage={setPage}/>
      <ImageGallery searchImage={searchImage} page={page} setPage={setPage}/>
      <Toaster />
    </>
  );
};

export default App;

