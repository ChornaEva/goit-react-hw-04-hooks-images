import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button';
import Modal from '../Modal';

const ImageGallery = ({ searchImage }) => {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchImage !== '') {
      setStatus('pending');
      setGallery([]);
      setPage(1);

      fetch(
        `https://pixabay.com/api/?q=${searchImage}&page=1&key=24369719-4937f00e9b76df3c43c2e5aa7&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        // из полученного массива забираем картинки и распыляем в стейт
        .then(gallery => {
          setGallery([...gallery.hits]);
          setStatus('resolved');
          setTotal(gallery.totalHits);
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    }
  }, [searchImage]);

  useEffect(() => {
    if (page !== 1) {
      setStatus('pending');
      fetch(
        `https://pixabay.com/api/?q=${searchImage}&page=${page}&key=24369719-4937f00e9b76df3c43c2e5aa7&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        // получаем новые картинки, распыляем в галерею уже сущ-е и новые
        .then(newGallery => {
          setGallery(prevGallery => [...prevGallery, ...newGallery.hits]);
          setStatus('resolved');
          setTotal(newGallery.totalHits);
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    }
  }, [page, searchImage]);

  useEffect(() => {
    if (status === 'rejected') {
      toast.error('Woops...');
    }
  }, [status]);

  // при клике на кнопку загрузить ещё- увеличиваем стра на 1
  const onLoadMore = event => {
    event.preventDefault();
    setPage(prevPage => prevPage + 1);
  };

  // открытие/закрытие модального окна
  const toggleModal = (largeImageURL = '') => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  return (
    <>
      {status === 'idle' ? <div>'Enter your querry'</div> : null}
      {status === 'pending' ? <Loader /> : null}

      {status === 'resolved' ? (
        <ul className="ImageGallery">
          {gallery.length
            ? gallery.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  imageURL={image.webformatURL}
                  largeImageURL={image.largeImageURL}
                  toggleModal={toggleModal}
                />
              ))
            : null}
        </ul>
      ) : null}
      {gallery.length < total ? (
        <Button type="button" onClick={onLoadMore} />
      ) : null}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
    </>
  );
};

export default ImageGallery;
