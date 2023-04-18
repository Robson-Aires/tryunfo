import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      data: [],
    };
  }

  renderButton = () => {
    const numero = 90;
    const numeros = 210;
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare } = this.state;
    if (
      cardName
        && cardDescription
        && +cardAttr1 >= 0 && +cardAttr1 <= numero
        && +cardAttr2 >= 0 && +cardAttr2 <= numero
        && +cardAttr3 >= 0 && +cardAttr3 <= numero
        && +cardAttr1 + +cardAttr2 + +cardAttr3 <= numeros
        && cardImage
        && cardRare) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.renderButton();
    });
  };

  clearbutton = () => {
    this.setState(() => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), this.trueOrFalse);
  };

  onSaveButtonClick = (objInfo) => {
    this.setState((prevState) => ({
      data: [...prevState.data, objInfo],
    }), this.clearbutton);
  };

  trueOrFalse = () => {
    const { data } = this.state;
    data.some((card) => card.cardTrunfo);
    this.setState({
      hasTrunfo: data.some((card) => card.cardTrunfo),
    });
  };

  deleteCardButton = (value) => {
    const { data } = this.state;
    const result = data.filter((element) => value !== element.cardName);
    this.setState({
      data: result,
    });
  };

  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare, cardTrunfo,
      isSaveButtonDisabled, data, hasTrunfo } = this.state;
    return (
      <>
        <Form
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ +cardAttr1 }
          cardAttr2={ +cardAttr2 }
          cardAttr3={ +cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          cardTrunfo={ cardTrunfo }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ +cardAttr1 }
          cardAttr2={ +cardAttr2 }
          cardAttr3={ +cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        {
          data.map((element, index) => (
            <>
              <Card
                className="CardList"
                key={ index }
                onInputChange={ this.onInputChange }
                cardName={ element.cardName }
                cardDescription={ element.cardDescription }
                cardAttr1={ element.cardAttr1 }
                cardAttr2={ element.cardAttr2 }
                cardAttr3={ element.cardAttr3 }
                cardImage={ element.cardImage }
                cardRare={ element.cardRare }
                cardTrunfo={ element.cardTrunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.deleteCardButton(element.cardName) }
              >
                excluir
              </button>
            </>
          ))
        }
      </>
    );
  }
}

export default App;
