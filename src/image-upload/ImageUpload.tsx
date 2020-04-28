import React, { ChangeEvent, FormEvent } from "react";
import './ImageUpload.css';

interface Props {
  onUpload: (imageUrl: string) => void
}

interface State {
  image: File | undefined
}

export class ImageUpload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      image: undefined
    };
  }

  isFormValid() {
    return !!this.state.image;
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      image: e.target.files?.[0]
    });
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();

    this.props.onUpload(URL.createObjectURL(this.state.image));
  }

  render() {
    return (
      <form className="image-upload" onSubmit={e => this.handleSubmit(e)}>
        <input type="file" accept=".png,.jpg,.jpeg" onChange={e => this.handleChange(e)} />
        <input type="submit" value="Display" disabled={!this.isFormValid()} />
      </form>
    );
  }
}