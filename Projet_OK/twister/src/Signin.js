import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Signin extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (



        <div className='center'>
        <div id='centrelogo'>
          <div id='logo' ></div>
              <div className='content'>
                 <h1>Twister</h1>

            <div id='login'>
            <label htmlFor='nom'></label>
            <input type='text' ref='nom' placeholder='Nom' required/> <br/>
            
            
            
             <label htmlFor='prenom'></label>
            <input type='text' ref='prenom' placeholder='Prenom' required/><br/>
           
            
           
             <span> <label htmlFor='login'></label> 
            <input type='text' ref='login' placeholder='Login' required/><br/>
           

            
             <label htmlFor='password'></label>
            <input type='password' ref='password' placeholder='Mot de passe' required/><br/>
            

            
            <label htmlFor='password2'></label> 
            <input type='password' ref='password2' placeholder='Retaper le mot de passe' required/><br/>
            
           
             <label htmlFor='birthday'></label> </span>
            <input type='text' ref='birthday' placeholder='Date de naissance' required/><br/>
            
            <span><label htmlFor='pseudo'></label> </span>
            <input type='text' ref='pseudo' placeholder='Pseudo' required/><br/>

            <span><label htmlFor='age'></label> </span>
            <input type='text' ref='age' placeholder='age' required/><br/>


            
            
         
            <button onClick={()=>this.props.action(this.refs.nom.value, this.refs.prenom.value,
              this.refs.login.value,this.refs.password.value, this.refs.password2.value,
              this.refs.birthday.value,this.refs.pseudo.value, this.refs.age.value)}>Inscription</button> 
            


           
            <button onClick={this.props.back}>Revenir en arrière </button>
           
            

            </div>
            </div >
            </div>
            </div>
        
    );
  }




}

export default Signin;
