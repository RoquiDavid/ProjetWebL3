import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationPannel from './NavigationPannel.js';
import Signin from './Signin.js';
import TweetWall from './TweetWall';
import ProfilePage from './ProfilePage.js';
import MyPage from './MyPage.js';
import axios from 'axios';


class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentView: 'connection',
      isConnected: false,
      isNewUser: false,
      isProfilePage: false,
      isMyProfile: false,
      s_key:'',
      login :'',
      password :'',
      u_id :-1,
      author: '',
      authorId:-1
    } ;
    this.getConnected = this.getConnected.bind(this);
    this.setLogout  = this.setLogout.bind(this);
    this.getSignin = this.getSignin.bind(this);
    this.getProfilePage = this.getProfilePage.bind(this);
    this.getTweetWall = this.getTweetWall.bind(this);
    this.getMyPage = this.getMyPage.bind(this);
    this.getRegister = this.getRegister.bind(this);
    this.backFromSignin = this.backFromSignin.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
  }

  

  render() {
    let page ;
    if(this.state.isConnected){
      if( (!this.state.isMyProfile) && (!this.state.isProfilePage) ){
        page = <TweetWall getProfilePage={this.getProfilePage} s_key={this.state.s_key} login={this.state.login} u_id={this.state.u_id} />
      }else{
        if( (this.state.isProfilePage) && (!this.state.isMyProfile) ){
          page = <ProfilePage getTweetWall={this.getTweetWall} author={this.state.author} authorId={this.state.authorId}  s_key={this.state.s_key} u_id={this.state.u_id}/>
          
        }else{
          if(this.state.currentView == "signin" && this.state.isNewUser){
            page = <Signin action={this.getRegister} back={this.backToLogin}/>;
          }
        }
      }
    }
    return (
      <div className="App">

        <NavigationPannel login={this.getConnected} logout={this.setLogout} 
        isConnected={this.state.isConnected} isNewUser={this.state.isNewUser} signin={this.getSignin}
        isProfilePage= {this.state.isProfilePage} profilepage={this.getProfilePage} 
        getMyPage={this.getMyPage} isMyProfile={this.state.isMyProfile}
        register={this.getRegister} back={this.backFromSignin} getTweetWall={this.getTweetWall}
        s_key={this.state.s_key} u_id={this.state.u_id} userName={this.state.login}/>

          {page}

      </div>
    );
  }

  /******* LOGIN *******/
  getConnected(login, password, root) {
    this.setState({currentView: 'connection', isNewUser: false, isConnected:false, s_key:'', login: '', password:'', isMyProfile: false, isProfilePage:false, u_id:'', author:'', authorId:-1}, function () {
      console.log("Login");
    const formData = new URLSearchParams();
    formData.append("login", login);
    formData.append("password",password);
    formData.append("root", root);
    axios.get("http://localhost:4001/user/login?"+formData).then(reponse=>{this.responseLogin(reponse, login)}).catch(error => {alert(error)});

    
  });

 
  }

  responseLogin(r, login){

    if(r.data.status === "OK"){
      this.getId(login, r.data.key);
    }else{
      {alert(r.data.error_message)};
    }
  } 

  
/********** RECUPERATION ID  ***********/
  getId(login, key){
    const formData1 = new URLSearchParams();
    formData1.append("key", key);
    formData1.append("login", login);
    axios.get("http://localhost:8080/user/getUserInformations?"+formData1).then(response => this.f(login,key,response.data));
  }

  f(login,key,data){
    this.setState({currentView: 'tweetWall', isConnected:true, s_key: key, login: login, isMyProfile: false, isProfilePage:false, u_id: data.u_id})
    
   
  }

  setId(r){
    if(r.data.status === "OK"){
    this.setState({u_id: r.data.u_id}, function () {
      console.log("L'u_id est ",this.state.u_id);

  });}
  else{
    console.log(r.data.error_message)
  }

  }

/******* DECONNEXION ***********/
  setLogout(){
    console.log("Logout");
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    axios.get("http://localhost:8080/user/logout?"+formData).then(reponse=>{this.responseLogout(reponse)}).catch(error => {alert(error)});


  }

  responseLogout(r){
    console.log(this.state.s_key)
    if(r.data.status === "OK"){
      this.setState({currentView: 'connection', isConnected: false, isProfilePage: false, s_key:'', login: '', u_id: -1,
    author:'', authorId:-1, isNewUser: false, isMyProfile: false})
    this.setState({currentView: 'connection', isConnected: false, isProfilePage: false, s_key: '',login:'', u_id:-1,author:'', authorId:-1, isNewUser: false, isMyProfile: false } ,function () {
      console.log("Logout reponse");
  });
    }else{
      {alert(r.data.error_message)};
    }
  }



  /****** INSCRIPTION  *********/
  getSignin(){
    console.log("Nouveau");
    this.setState({currentView: 'signin', isNewUser: true});
  }

   getRegister(nom, prenom, login, password, password2, birthday,age,pseudo) {
    if(password !==  password2){
      {alert("Mots de passe différents")}
 }else{
     if(password === password2 && nom !== '' && prenom !== ''  && password !== '' && password2 !== '' && login !== '' && birthday !== '' && age !== '' && pseudo !==''){
      /*api.post('/user', {params: {'login': this.refs.login,'password': this.refs.password,
      'lastname': this.refs.prenom,
      'firstname': this.refs.nom,
      'pseudo': this.refs.pseudo,
      'birthday': this.refs.birthday,
      'age': this.refs.age}})
      .then(response =>{
        console.log(response.data)
      })
      .catch(error => {
        console.log(erroe);
      })*/
       console.log("Signin");
       console.log(login, birthday, password, password2,age)
       const formData = new URLSearchParams();
       formData.append("login", login);
       formData.append("password",password);
       formData.append("lastname",prenom);
       formData.append("firstname", nom);
       formData.append("pseudo",pseudo);
       formData.append("birthday",birthday);
       formData.append("age",age);
       axios({
        method: "post",
        url: "http://localhost:4001/api/user",
        data: formData,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          alert("ok")
          console.log(response);
        })
        .catch(function (response) {
          alert("not ok")
          console.log(response);
        });
  //    axios.get("http://localhost:8080/user/createUser?"+formData).then(r=>{this.responseRegister(r)}).catch(error => {alert("erreur")});
    }else{
                {alert("Un des champs est vide")}
     }}

    }

    responseRegister(r){
      if(r.data.status === "OK"){
        this.getConnected(r.data.login, r.data.password, false)

      }else{
        {alert(r.data.error_message)};
        this.getSignin();
      }
  } 

  /********* PAGE PROFIL  **********/
  
  getProfilePage(author, authorId){
    this.setState({currentView: 'profilepage', isProfilePage: true, author:author, authorId: authorId})
    this.setState({currentView: 'profilepage', isProfilePage:true, author: author, authorId: authorId, isConnected: true}, function () {
      console.log("getProfilePage");
  });
  }


  /****** RETOUR AU MUR DE TWEETS */
  getTweetWall(){
    console.log("j'essaie de revenir au fil")
    this.setState({currentView: 'tweetWall', isProfilePage: false, isMyProfile: false});
    this.setState({isProfilePage: false, isMyProfile:false, currentView:'tweetWall'}, function () {
      console.log("getTweetWall");
  });
  }

  getMyPage(){
    this.setState({currentView: 'myProfile', isMyProfile: true})
    this.setState({currentView: 'myProfile', isMyProfile: true, isProfilePage: true}, function () {
      console.log("getMyPage");
  });
  }

  backFromSignin(){
    this.setState({currentView:'connection', isConnected: false, isNewUser: false})
  }

  /******** RETOUR A LA PAGE LOGIN */

  backToLogin(){
    this.setState({isProfilePage: false, isMyProfile:false, currentView:'connection', isNewUser: false, isConnected: false,
  s_key: '',login :'', password:'', u_id: -1, author: '', authorId:-1}, function () {
      console.log("backToLogin");
  });
  }
  
}

export default MainPage;
