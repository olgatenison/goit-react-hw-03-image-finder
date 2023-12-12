import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  // тоглить модалку
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <li className={css.item}>
          <img
            className={css.image}
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.toggleModal}
          />

          {showModal && ( // Если showModal равно true, отображаем модальное окно
            <Modal
              largeImageURL={image.largeImageURL} // URL большого изображения
              tags={image.tags} // Теги изображения
              onClose={this.toggleModal} // Обработчик для закрытия модального окна
            />
          )}
        </li>
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
