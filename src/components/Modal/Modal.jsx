import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // Обработчик события нажатия клавиши
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose(); // Закрываем модальное окно при нажатии клавиши Escape
    }
  };

  handleImageClick = () => {
    // Действия при клике на изображение в модальном окне
  };

  render() {
    const { largeImageURL, tags, onClose } = this.props;

    return (
      <>
        <div className={css.overlay} onClick={onClose}>
          <div
            className={(css.modal, css.close)}
            onClick={this.handleImageClick}
          >
            <img src={largeImageURL} alt={tags} />
          </div>
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
