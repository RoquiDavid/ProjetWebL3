import React, { Component } from 'react';
import Login from "./Login.js";
import Logout from "./Logout.js";
import './App.css';
import Signin from './Signin.js';
import MyPage from './MyPage.js';

class NavigationPannel extends Component {
  constructor(props){
    super(props);
    this.state={
      isConnected:false, 
      show : false,
      login: this.props.userName
    }
    this.back = this.back.bind(this);
    this.getMyProfile = this.getMyProfile.bind(this);
    this.toto()
  }
  

  toto() {
      console.log("depuis navigation pannel login",this.props.login);
  }


  getMyProfile(){
    this.props.getMyPage();
    this.setState({isConnected:true});
    this.setState({isConnected: true, show: true}, function () {
      console.log("getMyProfile", this.state.show);
  });
  }

  back(){
    this.props.getTweetWall();
    
  }

  setConnected(login, key){
    this.props.getConnected(login, key);
  }

  setSignin(){
    this.props.getSignin();
  }

  setLogout(){
    this.props.setLogout();
  }

  render() {
    let page ;
    if( (this.props.isConnected) && (!this.state.show) ) {
      
      page = (<div>
      <Logout action={this.props.logout}/> 
      <MyPage getMyProfile={this.getMyProfile} back={this.back}  s_key={this.props.s_key} u_id={this.props.u_id} login={this.state.login}/>
       </div>); 
    }else{
      if( (this.props.isConnected) && (this.state.show)){
        page =  (<div>
        <Logout action={this.props.logout}/> 
              <MyPage getMyProfile={this.getMyProfile} back={this.back}  s_key={this.props.s_key} u_id={this.props.u_id} login={this.props.userName}/>
              </div> )
      }else{
        if(this.props.isNewUser ){
          page =  <Signin action={this.props.register} back={this.props.back}/>;
        }else{
         page = (<div>
          <Login action={this.props.login} signin={this.props.signin}/>
          </div> );}
      }
    }
      return <div id='banniere'>
       {page}</div>;
   
  
  }
}

export default NavigationPannel;
