import React, { Component } from 'react';
import './App.css';
import Signin from './Signin.js';
import axios from 'axios';

/* Ajouter option rester connecter */
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      connection: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
      
      <div className='center'>
      <div id='centrelogo'>
          <div id='logo' ></div>
      
        <div className='content'>
            <h1>Twister</h1>
            <div  id='login'>
              <label htmlFor='login'></label>
              <input type='text' ref='login' placeholder='Login' required/> <br/>
              <label htmlFor='password'></label>
              <input type='password' ref='password' placeholder='Mot de passe' required /> <br/>
              <div id='champs'>
              
              Rester connecté
             <input name='connection' type="checkbox" checked={this.state.value} onChange={this.handleInputChange} className='enfant'/>
            
              </div>
              <button onClick={()=>this.props.action(this.refs.login.value,this.refs.password.value, this.state.connection)}>Connexion</button>
              <button onClick={this.props.signin}>Nouveau sur Twister ?</button>
              

              </div>
          </div>

        </div>
        </div>
        </div>
    );
  }




}

export default Login;
