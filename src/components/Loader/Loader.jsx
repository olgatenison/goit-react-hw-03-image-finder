import { MutatingDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <MutatingDots
        height="100"
        width="100"
        color="#ee8787"
        secondaryColor="#ee8787"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
