import React from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  state = {
    nameInput: '',
    // submitButton: false,
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
    await createUser({ name: nameInput });
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
        </form>
      </div>
    );
  }
}
