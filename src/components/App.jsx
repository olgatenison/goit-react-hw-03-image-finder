import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KEY = '40311007-381e26539f6c0a156243500cd';
const perPage = 12;

class App extends Component {
  // РІРёС…С–РґРЅРµ РїРѕР»РѕР¶РµРЅРЅСЏ
  state = {
    search: '', // РїРѕС€СѓРє
    images: [], // РєР°СЂС‚РёРЅРєРё С‰Рѕ РїСЂРёР№С€Р»Рё
    currentPage: 1, // РїРѕС‚РѕС‡РЅРёР№ РЅРѕРјРµСЂ СЃС‚РѕСЂС–РЅРєРё
    error: null, // РїРѕРІС–РґРѕРјР»РµРЅРЅСЏ РїСЂРѕ РїРѕРјРёР»РєСѓ
    loading: false, // РїСЂР°РїРѕСЂРµС†СЊ Р·Р°РІР°РЅС‚Р°Р¶РµРЅРЅСЏ
    totalPages: 0, // Р·Р°РіР°Р»СЊРЅР° РєС–Р»СЊРєС–СЃС‚СЊ СЃС‚РѕСЂС–РЅРѕРє
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const URL = `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      this.setState({ loading: true }); // РІРјРёРєР°С”РјРѕ Р»РѕСѓРґРµСЂ

      const response = await axios.get(URL); // СЂРѕР±РёРјРѕ Р·Р°РїРёС‚
      const data = response.data;
      const newImages = data.hits;

      if (newImages.length === 0 || !this.state.search) {
        // СЏРєС‰Рѕ РЅРµРјР°С” РєР°СЂС‚РёРЅРєРё С‚Рѕ РІРёРІРѕРґРёРјРѕ РїРѕРјРёР»РєСѓ
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalPages: Math.ceil(data.totalHits / 12),
        error: '',
        loading: false, // Р·РЅС–РјР°С”РјРѕ Р»РѕСѓРґРµСЂ
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false }); // РІ Р±СѓРґСЊ-СЏРєРѕРјСѓ РІРёРјРєРЅСѓС‚Рё Р»РѕСѓРґРµСЂ
    }
  };

  handleSubmit = searchQuery => {
    this.setState({
      search: searchQuery,
      images: [],
      currentPage: 1,
    });
  };

  onLoadMoreButton = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, totalPages, currentPage, loading } = this.state;

    return (
      <>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={images}></ImageGallery>
        {images.length > 0 && totalPages !== currentPage && (
          <Button onLoadMoreButton={this.onLoadMoreButton} />
        )}
        {loading && <Loader />}
      </>
    );
  }
}
export default App;
