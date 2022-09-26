import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (
      <label htmlFor="dccd">
        <input type="text" data-testid="name-input" />
        <textarea cols="30" rows="10" data-testid="description-input"> </textarea>
        <input type="number" data-testid="attr1-input" />
        <input type="number" data-testid="attr2-input" />
        <input type="number" data-testid="attr3-input" />
        <input type="text" data-testid="image-input" />
        <select data-testid="rare-input">
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
          <input type="checkbox" data-testid="trunfo-input" />
          <button type="button" data-testid="save-button">Salvar</button>
        </select>
      </label>
    );
  }
}
