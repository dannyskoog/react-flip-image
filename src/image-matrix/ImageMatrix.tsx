import React from "react";
import './ImageMatrix.css';

enum ArrowDirection {
  Up,
  Down,
  Right,
  Left
}

interface Image {
  url: string,
  rotation: {
    y: number,
    x: number
  }
}

interface Props {
  imageUrl: string;
}

interface State {
  images: Image[]
}

export class ImageMatrix extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      images: []
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.imageUrl !== this.props.imageUrl) {
      const images: Image[] = [...Array(4)].map(() => ({
        url: this.props.imageUrl,
        rotation: {
          y: 0,
          x: 0
        }
      }));

      this.setState({
        images
      });
    }
  }

  handleArrowClick(imageIndex: number, direction: ArrowDirection) {
    const image = this.state.images[imageIndex];
    let { x, y } = image.rotation;

    switch (direction) {
      case ArrowDirection.Up:
      case ArrowDirection.Down:
        x = Math.abs(x - 180);
        break;
      case ArrowDirection.Left:
      case ArrowDirection.Right:
        y = Math.abs(y - 180);
    }

    this.setState(val => ({
      images: val.images.map((image, index) => index === imageIndex ? { ...image, rotation: { x, y } } : image)
    }));
  }

  render() {
    return (
      <div className="image-matrix">
        {this.state.images.map((image, index) => (
          <div key={index} className="cell">
            <span className="arrow up" onClick={() => this.handleArrowClick(index, ArrowDirection.Up)}></span>
            <span className="arrow left" onClick={() => this.handleArrowClick(index, ArrowDirection.Left)}></span>
            <img src={image.url} alt="" style={{ transform: `rotateX(${image.rotation.x}deg) rotateY(${image.rotation.y}deg)` }} />
            <span className="arrow right" onClick={() => this.handleArrowClick(index, ArrowDirection.Right)}></span>
            <span className="arrow down" onClick={() => this.handleArrowClick(index, ArrowDirection.Down)}></span>
          </div>
          ))
        }
      </div>
    );
  }
}