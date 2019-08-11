import React, { Component } from 'react';
import youtube from 'api/youtubeApi';
import { getVideoData, formatSnippet } from './services/YoutubeHelper';

export default class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      snippet: null,
      generated: false
    }
    this.textAreaRef = React.createRef();
    this.generatedTextAreaRef = React.createRef();
  }

  componentDidMount() {
    this.textAreaRef.current.rows = 2;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.generated !== this.state.generated) this.handleRowUpdate();
    if (prevState.snippet === null && this.state.snippet) this.handleSnippetTextArea();
  }

  handleChange(e) {
    this.handleRowUpdate();
    this.setState({ value: e.target.value, generated: false });
  }

  handleRowUpdate() {
    this.textAreaRef.current.rows = 1;
    const updatedRows = ~~(this.textAreaRef.current.scrollHeight / 24);
    this.textAreaRef.current.rows = updatedRows;
  }

  handleGenerate = async (e) => {
    e.preventDefault();
    const { value } = this.state;
    const url = value.split('\n');
    const videoData = getVideoData(url);
    this.setState({ loading: true });
    const response = await youtube.get('/videos', {
      params: {
        id: videoData.id
      }
    });
    this.setState({ loading: false, snippet: response.data });
  }

  handleSnippetTextArea() {
    const { snippet } = this.state;
    this.generatedTextAreaRef.current.value = formatSnippet(snippet).join("\n");
    this.setState({ snippet: null });
  }

  render() {
    const { value, loading } = this.state;
    return (
      <div>
        <form onSubmit={(e) => this.handleGenerate(e)}>
          <textarea ref={this.textAreaRef} placeholder="YouTube URL" value={value} onChange={(e) => this.handleChange(e)} disabled={loading} />
          <button className="secondary button" type="submit" disabled={loading}>Generate</button>
        </form>
        <textarea ref={this.generatedTextAreaRef} placeholder="Generated Imports" onChange={(e) => this.handleChange(e)} disabled={loading} />
      </div>
    );
  }
}
