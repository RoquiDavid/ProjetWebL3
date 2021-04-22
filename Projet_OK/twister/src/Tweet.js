import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class Tweet extends Component {
  constructor(props){
    super(props);
    this.state = {
      author:this.props.author.login,
      like:0,
      dislike:0,
      authorId: this.props.author.authorID, 
      m_id : this.props.m_id, 
      u_id: this.props.u_id,
      msg:this.props.msg,
      date: this.props.date, 
      s_key: this.props.s_key, 
      haveLike:false,
      haveDislike:false,
      show:this.props.show,
      showProfile:this.props.showProfile
    };
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleClickDislike = this.handleClickDislike.bind(this);
    this.handleClickLike = this.handleClickLike.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    //this.montage();
    
  }



/******* MONTAGE *******/
montage(){
  this.setState({u_id: this.props.u_id,m_id: this.props.m_id}, function () {
    console.log("montage");
});
}



   /****** LIKE et DISLIKE ******/
  handleClickDislike(){
    if(this.state.haveDislike){
      alert("Vous avez déjà dislike.")
    }else{
      if(!this.state.haveLike){
        this.setState({dislike:1, haveDislike:false})
      }else{
        this.setState({dislike:1, like:0, haveDislike: true, haveLike: false});
      }
    
    }
    
  }

  handleClickLike(){
    if(this.state.haveLike){
      alert("Vous avez déjà like.");
    }else{
      if(!this.state.haveDislike){
        this.setState({like:1, haveLike: true});
      }else{
        this.setState({dislike:0, like:1, haveDislike: false, haveLike: true});
      }

    }
  }

/********* RECUPERATION PROFIL ********/
  handleClickProfile(author, authorId) {
    /*event.preventDefault();*/
    this.props.getProfile(this.state.author, authorId);
    this.setState({author: '', authorId: -1});
      
  }



  setId(id){
    this.setState({authorId: id })

  }

  /********* SUPPRESSION MESSAGE *********/
  deleteMessage(){
    const formData1 = new URLSearchParams();
    formData1.append("key", this.state.s_key);
    formData1.append("messageID", this.state.m_id);
    axios.get("http://localhost:8080/message/deletePost?"+formData1).then(reponse => {this.actionDeleteMessage(reponse)}).catch(error => 
        {alert(error);});
  
  }

    actionDeleteMessage(r){
      console.log("Suppression")
    if(r.data.status === "OK"){
      this.props.deleteMessage(this.state.m_id);
    }else{
      {alert(r.data.error_message)}
    }
  }



  /******* ********/


  render() {
    let boutonDelete ;
    if(this.state.u_id === this.state.authorId && this.state.show){
      boutonDelete =  (<button onClick={this.deleteMessage}>Supprimer</button>)
    }else{
      boutonDelete = (<p></p>)
    }
    let boutonProfil 
    if(this.state.showProfile){
        boutonProfil =  <button onClick={() => this.handleClickProfile(this.state.author, this.state.authorId)}>Voir le profil</button>
    }else{
      boutonProfil = (<p></p>)
    }
    return (
      <div className="tweet-container">
      <div className='tweet-date'>{this.state.date},</div>
      <div className='tweet-author'>{this.state.author} a écrit</div>
        <div className='tweet-msg' >{this.state.msg}</div>
        
        
        <div className='becomeFriend'>
        {boutonProfil}
        <button onClick={this.handleClickLike}>{this.state.like} like</button>
        <button onClick={this.handleClickDislike}>{this.state.dislike} dislike</button>
        {boutonDelete}
        </div>
      </div>
    );
  }
  
}


export default Tweet;
