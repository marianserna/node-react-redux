import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';

const Landing = () => <h1>Landing</h1>;

class App extends React.Component {
  componentDidMount() {
    // access action creator
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            {/* <Route path="/surveys/new" component={SurveyNew} /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
