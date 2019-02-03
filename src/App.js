import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavigationItems from './components/Navigation/NavigationItems/NavigationItems';
import MovieList from './containers/MovieList/MovieList';
import People from './containers/People/People';
import DisplayPerson from './containers/People/DislayPerson/DisplayPerson';
import DisplayMovie from './containers/DisplayMovie/DisplayMovie';
import LandingPage from './containers/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationItems />
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/search/:type/:true/:name' exact component={MovieList} />
          <Route path='/title/:type/:id' exact component={DisplayMovie} />
          <Route path='/person/popular' exact component={People} />
          <Route path='/:people/:type/:id' component={DisplayPerson} />
          <Route path='/:type/:id' component={MovieList} />
          <Redirect to="/"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
