import React, { Component } from 'react';
import youtube from 'api/youtubeApi';
import { getVideoData, formatSnippet } from './services/YoutubeHelper';

export default class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      snippet: null
    }
    this.textAreaRef = React.createRef();
    this.generatedTextAreaRef = React.createRef();
  }

  componentDidMount() {
    this.textAreaRef.current.rows = 2;
    this.generatedTextAreaRef.current.rows = 2;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.snippet === null && this.state.snippet) this.handleSnippetTextArea();
  }

  handleChange(e, ref) {
    this.handleRowUpdate(ref);
    this.setState({ value: e.target.value });
  }

  handleRowUpdate(ref) {
    ref.current.rows = 1;
    const updatedRows = ~~(ref.current.scrollHeight / 24);
    ref.current.rows = updatedRows > 10 ? 10 : updatedRows;
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
    this.handleRowUpdate(this.generatedTextAreaRef);
    this.setState({ snippet: null });
  }

  render() {
    const { value, loading } = this.state;
    return (
      <div>
        <form onSubmit={(e) => this.handleGenerate(e)}>
          <textarea ref={this.textAreaRef} placeholder="YouTube URL" value={value} onChange={(e) => this.handleChange(e, this.textAreaRef)} disabled={loading} />
          <button className="secondary button" type="submit" disabled={loading}>Generate</button>
        </form>
        <textarea disabled ref={this.generatedTextAreaRef} placeholder="Generated Imports" />
      </div>
    );
  }
}
