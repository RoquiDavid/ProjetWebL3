import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Tweet from './Tweet';
import TweetForm from './TweetForm';
import ProfilePage from './ProfilePage';

const TWEETS = [
  {msg:'salut', author:'sarah', date:'2021-04-06T08:55:19.656Z'},
  {msg:'hi', author:'loulou', date:'2021-04-06T08:55:19.656Z'},
  {msg:'bye', author:'toto', date:'2021-04-06T08:55:19.656Z'}
]


class TweetWall extends Component {
  constructor(props){
    super(props);
    console.log("tweeet wall " + this.props.u_id);
    this.state = {
      tweets: [],
      profilePage: false, 
      s_key : this.props.s_key, 
      login : this.props.login, 
      u_id : this.props.u_id
    }
    this.addTweet = this.addTweet.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.toto()
  };
 

  setId(u_idtmp){
    this.setState({u_id: u_idtmp});
  }
  /******** MONTAGE  ********/



  toto() {

    console.log("Recupération Tweets");
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("id", this.state.u_id);
    formData.append("nb", -1);
    formData.append("friends", "ok");
    axios.get("http://localhost:8080/message/listMessages?"+formData).then(reponse => {this.traiteReponseMontage(reponse); }).catch(error => {alert("Une erreur vient de survenir");console.log(error)});
  }

  traiteReponseMontage(r){
    if(r.data.status === "OK"){
      if(r.data.posts.length === 0){
        this.getAllMessages();
      }else{
          const t = r.data.posts.map((tweet, index) =>{
            console.log(tweet);
            return (
              
              <Tweet key={index} author={tweet.author} msg={tweet.message} date={tweet.date} getProfile={this.getProfile} s_key={this.state.s_key} m_id ={tweet._id} u_id={this.state.u_id}  deleteMessage={this.deleteMessage} show={true} showProfile={true} />
              
           )})
           this.setState({tweets:t}, function () {
             console.log('reponse montage tweet');
        });
    }
    }
  }
/******* TRAITE TOUS LES MESSAGES SI L'UTILISATEUR NE SUIT PERSONNE  */
  getAllMessages(){
    console.log("Recupération de tous les Tweets");
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    axios.get("http://localhost:8080/message/listAllMessages?"+formData).then(reponse =>{this.setAllMessages(reponse); }).catch(error => {alert("Erreur dans la récupération des messages")});
  }

  setAllMessages(r){
    if(r.data.status === "OK"){
        console.log(r, r.data)
        const t = r.data.messages.map((tweet, index) =>{
          return (
            <Tweet key={index} author={tweet.author} msg={tweet.message} date={tweet.date} getProfile={this.getProfile} s_key={this.state.s_key} m_id ={tweet._id} u_id={this.state.u_id}  deleteMessage={this.deleteMessage} show={true} showProfile={true}/>
            
         )})
         this.setState({tweets:t}, function () {
           console.log('récupération réussie');
      });

      }
  }


  /********** AJOUT TWEET ********/

  addTweet(msg, author){
    if(msg !== ''){
    var dateFormat = require('dateformat');
    var now = new Date();
    let d = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const tweet = {msg:msg, date: d}
    console.log(tweet)
    console.log("Add Twett");
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("message", msg);
    axios.get("http://localhost:8080/message/addPost?"+formData).then(reponse => {this.responseAddMessage(reponse, tweet); 
     }).catch(error => {alert(error.data)});}
     else{
       alert("Attention votre message est vide.")
     }
  }

  responseAddMessage(r, tweet){
    if(r.data.status === "OK"){
        const t = <Tweet key={tweet.index} author={r.data.author} msg={tweet.msg} date={tweet.date} getProfile={this.getProfile} s_key={this.state.s_key} m_id={r.data._id} u_id={this.state.u_id}  deleteMessage={this.deleteMessage}  show={true} showProfile={true}  />
        this.setState({tweets: [t, ...this.state.tweets]});
        
    }else{
      {alert(r.data.error_message)};
    }
  } 


  /***** RECUPERATION PROFIL *******/

  getProfile(authorname, authorId){
    //this.setState({profilePage: true, author:authorname});
    this.props.getProfilePage(authorname, authorId);
  }

  /********* SUPPRESSION MESSAGE *********/
  deleteMessage(m_id){
    console.log("suprresion depuis tweetwall")
    var t = this.state.tweets;
    console.log(t)
    var filtered = t.filter(function(value, index, arr){

      return m_id !== value.props.m_id;
  
                    });

      this.setState({tweets:filtered}, function () {
        console.log('suppression réussie');
          });

  }


  /*****  ******/

  render() {
    return  (<div id='tweetwall'>
    
      
      
      <TweetForm addTweet={this.addTweet}/>
      <div className='container'> 
      {this.state.tweets}
        </div> 
        </div>) ;

    }
    
   
    
  
}



export default TweetWall;
