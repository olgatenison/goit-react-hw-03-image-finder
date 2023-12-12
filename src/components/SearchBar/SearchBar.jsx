import { Component } from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchName: '', // зберігає те, що ввели в пошук
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = this.state.inputValue.trim();
    this.props.onSubmit(searchQuery);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="searchName"
            placeholder="What photo do you want to find?"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
