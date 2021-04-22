import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

constructor(props){
  super(props);
  this.state = {etat :'false'} ;
  this.getConnected = this.getConnected.bind(this);
  this.setLogout  = this.setLogout.bind(this);
}

  render() {
    return (
      <div className="App">
      {this.state.articles.map(article => <h1 key = {article.id}> PRRRRRRRRRRRRRRRRRRRR</h1>)}
      {this.state.etat === 'true' ? 'true ': 'false'}


      </div>
    );
  }

  getConnected(){
    if(this.state.etat === 'false')
    this.setState({etat:'true'});
  }


setLogout(){
  if(this.state.etat == 'true')
  this.setState({etat:'false'});

}
}

export default App;
