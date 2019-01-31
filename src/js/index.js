import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UrbitApi from './api';


class WritePage extends Component {

  constructor() {
    super();

    this.state = {
      text: '',
      path: '',
      isPathLoaded: false
    };

    this.api = new UrbitApi();

    this.onSave = this.handleSave.bind(this);
    this.onLoad = this.handleLoad.bind(this);
    this.onChangeText = this.handleChangeText.bind(this);
    this.onChangePath = this.handleChangePath.bind(this);

    fetch('/~/auth.json', {credentials: "same-origin"})
      .then((res) => {
        return res.json();
      })
      .then((authTokens) => {
        this.api.setAuthTokens(authTokens);
      });
  }

  handleSave(event) {
    if (!this.state.path) { return; }
    this.api.pareto("/" + this.state.path, { text: this.state.text });
  }

  handleChangeText(event) {
    this.setState({ text: event.target.value });
  }

  handleChangePath(event) {
    this.setState({ path: event.target.value });
  }

  handleLoad() {
    if (!this.state.path) { return; }
    this.setState({ isPathLoaded: true });
    this.api.bind("/" + this.state.path, "PUT");
    this.api.poll(1, (data) => {
      if (data && 'json' in data) {
        this.setState({text: data.json.data.text});
      }
    });

  }

  render() {
    let pathField = !this.state.isPathLoaded ? (
      <div>
        <input
          value={this.state.path}
          class={"mb-2"}
          type={"text"}
          onChange={this.onChangePath} />
        <button class={"bg-black white"}
          onClick={this.onLoad}>Load Path</button>
      </div>
    ) : null;

    let dataField = this.state.isPathLoaded ? (
      <div class={"col-sm-10 col-md-10 col-lg-10"}>
        <textarea
          class={"mb-4"}
          value={this.state.text} 
          onChange={this.onChangeText}>
        </textarea>
        <button class={"bg-black white"}
          onClick={this.onSave}>Save</button>
      </div>
    ) : null;

    return (
      <div class={"container mt-10 row"}>
        {pathField}
        {dataField}
      </div>
    )
  }
}

ReactDOM.render(<WritePage />, document.querySelectorAll("#root")[0]);
