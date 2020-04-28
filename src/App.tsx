import React from 'react';
import './App.css';
import { ImageUpload } from "./image-upload/ImageUpload";
import { ImageMatrix } from "./image-matrix/ImageMatrix";

interface State {
  imageUrl: string;
}

export class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      imageUrl: ""
    };
  }

  handleUpload(imageUrl: string) {
    this.setState({
      imageUrl: imageUrl
    });
  };

  render() {
    return (
      <div className="App">
        <h1>React flip image</h1>
        <ImageUpload onUpload={imageUrl => this.handleUpload(imageUrl)} />
        <ImageMatrix imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}