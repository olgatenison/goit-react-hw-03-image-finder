import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMoreButton }) => {
  return (
    <>
      <button className={css.button} type="button" onClick={onLoadMoreButton}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onLoadMoreButton: PropTypes.func.isRequired,
};

export default Button;
