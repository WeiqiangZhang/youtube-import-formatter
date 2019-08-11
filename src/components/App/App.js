import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Youtube from 'components/Youtube';
import Home from 'components/Home';
import './styles/app.scss';
import 'styles/Formatter.scss';

class App extends Component {
  render() {
    return (
      <div className="formatter-wrapper app">
        <Router>
          <div className="top-bar app__top-bar">
            <ul className="menu">
              <li className="app__top-bar__list"><Link to="/"><span className="black">Home</span></Link></li>
              <li className="app__top-bar__list"><Link to="/youtube"><span className="black">YouTube</span></Link></li>
            </ul>
          </div>
          <div className="grid-x">
            <div className="cell small-6 small-offset-3">
              <Route path="/" exact component={Home} />
              <Route path="/youtube" component={Youtube} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
