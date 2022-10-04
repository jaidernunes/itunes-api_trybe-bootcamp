import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  state = {
    user: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserFromAPI();
  }

  getUserFromAPI = async () => {
    this.setState({
      loading: true,
    });

    const user = await getUser();

    this.setState({
      loading: false,
      user: user.name,
    });
  };

  render() {
    const { state } = this;

    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">{state.user}</h4>
        {state.loading && <Loading /> }
        <nav>
          <Link data-testid="link-to-search" to="/search">Busca</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>

      </header>
    );
  }
}
