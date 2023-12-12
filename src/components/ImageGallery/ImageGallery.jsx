import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={css.gallery}>
        {images.map(image => (
          <ImageGalleryItem key={nanoid()} image={image} />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ImageGallery;
