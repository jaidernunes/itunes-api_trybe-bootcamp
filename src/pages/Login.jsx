import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends React.Component {
  state = {
    nameInput: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  loginClick = async () => {
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: nameInput });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  render() {
    const { state } = this;
    const minCharName = 3;
    const isButtonDisabled = state.nameInput.length < minCharName;
    console.log(state.nameInput);

    return (

      <div data-testid="page-login">
        <form>
          <label htmlFor="nameInput">
            Name
            <input
              data-testid="login-name-input"
              type="text"
              id="nameInput"
              name="nameInput"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="login-submit-button"
            name="submitButton"
            disabled={ isButtonDisabled }
            onClick={ this.loginClick }
          >
            Entrar
          </button>

          {state.loading && <Loading /> }

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
