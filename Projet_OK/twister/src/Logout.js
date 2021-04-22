import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Logout extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div >
        <div id='push' className='alignement'>
          <div id='logo' ></div>
      </div>
      <div id='deconnexion' className='alignement'>
        <button  onClick={this.props.action}>Déconnexion</button>
        </div>
      </div>
    );
  }



}

export default Logout;
