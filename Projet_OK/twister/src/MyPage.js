import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Tweet from './Tweet';
import TweetWall from './TweetWall';



class MyPage extends Component {
  constructor(props){
    super(props);
    this.state = {
        show:false,
        bouton : true, 
        s_key: this.props.s_key,
        u_id: this.props.u_id, 
        followings_total :[],
        followers_total:[], 
        login: this.props.login, 
        tweets: []

    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.numberFollowers();
    this.numberFollowings();
    this.toto();
    this.getMessages()
  }

  componentWillReceiveProps(){
    this.setState({s_key: this.props.s_key, u_id: this.props.u_id})
    console.log(this.state.login, this.props.login)
  }

  toto(){
    console.log("my page", this.props.login, this.state.login);
  }


/******** BOUTONS *******/

handleClick(){
  this.props.getMyProfile();
    this.setState({show:true});
    this.setState({show: true, bouton: false}, function () {
      console.log("handleClick", this.state.show);
  });
  this.numberFollowers();
  this.numberFollowings();
    
}
handleClickBack(){
    this.setState({show:false});
    this.setState({show: false, bouton: true}, function () {
      console.log("handleClickBack", this.state.show);
  });
    this.props.back();
}

  /****** NOMBRE DE FOLLOWERS ******/

  numberFollowers(){
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("id", this.state.u_id);
    console.log("Clef", this.state.s_key, this.state.authorId)
    axios.get("http://localhost:8080/friend/listFollowers?"+formData).then(reponse=>{this.responseListFollowers(reponse)}).catch(error=>{alert("Erreur followers");});

  }

  responseListFollowers(r){
    if(r.data.status == "OK"){
      this.setState({followers_total: r.data.list_followers})
    }else{
      {alert(r.data.error_message)};
    }
  }

  /****** NOMBRE DE FOLLOWINGS ******/

  numberFollowings(){
    console.log("ABONNE")
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("id", this.state.u_id);
    axios.get("http://localhost:8080/friend/listFollowings?"+formData).then(reponse=>{this.responseListFollowings(reponse)}).catch(error=>{alert("Erreur followings");});

  }

  responseListFollowings(r){
    if(r.data.status == "OK"){
      this.setState({followings_total: r.data.list_followings})
      this.setState({followings_total: r.data.list_followings}, function () {
        console.log("Followings",this.state.followings_total)
    });
    }else{
      {alert(r.data.error_message)};
    }
  }

  /******* LISTE MESSAGES */

  getMessages(){
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("id", this.state.u_id);
    formData.append("nb", -1);
    axios.get("http://localhost:8080/message/listMessages?"+formData).then(reponse=>{this.responseMessage(reponse)}).catch(error=>{alert(error);});
  }

  responseMessage(r){
    if(r.data.status === 'OK'){
      console.log(r.data.posts)
      const t = r.data.posts.map((tweet, index) =>{
        return ( 
          <Tweet key={index} author={tweet.authorID} msg={tweet.message} date={tweet.date} getProfile={this.getProfile} s_key={this.state.s_key} m_id ={tweet._id} u_id={this.state.u_id}  deleteMessage={this.deleteMessage}/>
          
       )})
       this.setState({tweets:t}, function () {
         console.log('récupération réussie');
    });
    }
  }



/***********  ************/

  render() {

      let bouton ;
      let nb
      if(this.state.followers_total.length > 0){
        nb = this.state.followers_total.slice(0,4).map((fo, index) =>{
          return (
                    <div key={index}>
                          <p> {fo.login}</p>
                    </div>
                  )
         })
        }else{
            nb = <p> </p>
      }
      
      let abo ;
      if(this.state.followings_total.length > 0){
        abo = this.state.followings_total.slice(0,4).map((fo, index) =>{
          return (
                    <div key={index}>
                          <p> {fo.login}</p>
                    </div>
                  )
         })
        }else{
            abo = <p> </p>
      }
      if(this.state.show){
        bouton = (<div>
                  <div>
                         <button onClick={this.handleClickBack}>Revenir au fil d'actualité</button>
                            </div>
                  
                
                </div>);
      }
      else{
          bouton = (<div >
          <button onClick={this.handleClick}>Mon profil</button>
          </div>);
      }
      return (
          <div id='informations'>
                  <h1>{this.state.login}</h1>
                  <div >
                      <div id='abonné'> Followers : {this.state.followers_total.length}
                      {nb} 
                      </div>
                      <div id='abonnement'> Abonnements : {this.state.followings_total.length}
                          {abo}
                       </div>
                  </div>
                  

              <div>{bouton}</div>
              
                
          </div>

            );

  
}



  
}


export default MyPage;
