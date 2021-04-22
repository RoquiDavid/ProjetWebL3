import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Tweet from './Tweet';
import TweetForm from './TweetForm';

const TWEETS = [
  {msg:'salut', author:'sarah', date:'2021-04-06T08:55:19.656Z'},
  {msg:'hi', author:'loulou', date:'2021-04-06T08:55:19.656Z'},
  {msg:'bye', author:'toto', date:'2021-04-06T08:55:19.656Z'}
]


class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state ={
      follow:false,
      author: this.props.author, 
      authorId: this.props.authorId,
      s_key: this.props.s_key,
      u_id: this.props.u_id, 
      followers_total: [],
      followings_total: [],
      tweets:[]
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickFollow = this.handleClickFollow.bind(this);
    this.handleClickUnfollow = this.handleClickUnfollow.bind(this);
  }
 
  
  /******* MONTAGE *******/

  componentDidMount() {
    this.setState({author: this.props.author, authorId: this.props.authorId, s_key: this.props.s_key, u_id: this.props.u_id}, function () {
      console.log("montage");
  });
  const formData1 = new URLSearchParams();
  formData1.append("key", this.state.s_key);
  formData1.append("login", this.state.author);
  axios.get("http://localhost:8080/user/getUserInformations?"+formData1).then(reponse => {this.setId(reponse);}).catch(error => 
      {alert(error);});

  }

  traiteReponseMontage(reponse){
    this.setState({follow: reponse.data.is_follower}, function () {
      console.log("réponseMontage", this.state.follow);
  });
  this.numberFollowers();
  this.numberFollowings();
  this.getMessages();
  }

  afficheMessageErreur(er){
    {alert(er)}
  }

  isFollower(){
  const formData = new URLSearchParams();
  formData.append("key", this.state.s_key);
  formData.append("otherID", this.state.authorId);
  formData.append("userID", this.state.u_id);
  axios.get("http://localhost:8080/user/isFollowerInformation?"+formData).then(reponse=>{this.traiteReponseMontage(reponse)}).catch(error=>{this.afficheMessageErreur(error)})

  }
  setId(r){
    this.setState({authorId: r.data.u_id})
    this.setState({authorId: r.data.u_id}, function () {
      console.log("setID");
    this.isFollower();
  });

  }

  /***** RETOUR FIL D'ACTUALITE *******/
  handleClick(){
    this.props.getTweetWall();
  }

  /***** S'ABONNER  *******/
  handleClickFollow(){
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("id", this.state.authorId);
    axios.get("http://localhost:8080/friend/addFriend?"+formData).then(reponse=>{this.responseFollow(reponse)} ).catch(error =>  {alert(error);});
    
  }

  responseFollow(r){
    if(r.data.status == "OK"){
      this.setState({follow: true});
      this.setState({follow: true}, function () {
        console.log("Follow",this.state.follow)
    });
    this.numberFollowers()
   }else{
      {alert(r.data.error_message)};
    }
  }

  /****** DESABONNER *********/


  handleClickUnfollow(){
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("friendID", this.state.authorId);
    console.log("Clef", this.state.s_key, this.state.authorId)
    axios.get("http://localhost:8080/friend/deleteFriend?"+formData).then(reponse=>{this.responseUnfollow(reponse)}).catch(error=>{alert(error);});
 
    
  }

  responseUnfollow(r){
    if(r.data.status == "OK"){
      this.setState({follow: false});
      this.setState({follow: false}, function () {
        console.log("Unfollow",this.state.follow)
    });
    this.numberFollowers();
    }else{
      {alert(r.data.error_message)};
    }
  }
  /****** NOMBRE DE FOLLOWERS ******/

  numberFollowers(){
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("id", this.state.authorId);
    console.log("Clef", this.state.s_key, this.state.authorId)
    axios.get("http://localhost:8080/friend/listFollowers?"+formData).then(reponse=>{this.responseListFollowers(reponse)}).catch(error=>{alert(error);});

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
    formData.append("id", this.state.authorId);
    axios.get("http://localhost:8080/friend/listFollowings?"+formData).then(reponse=>{this.responseListFollowings(reponse)}).catch(error=>{alert(error);});

  }

  responseListFollowings(r){
    if(r.data.status == "OK"){
      this.setState({followings_total: r.data.list_followings})
      this.setState({followings_total: r.data.list_followings}, function () {
        console.log("Followings",this.state.followings_total)
    });
     // this.setFollowers(f_total, f)
    }else{
      {alert(r.data.error_message)};
    }
  }


  /******* LISTE MESSAGES */

  getMessages(){
    console.log("ABONNE")
    const formData = new URLSearchParams();
    formData.append("key", this.state.s_key);
    formData.append("id", this.state.authorId);
    formData.append("nb", -1);
    axios.get("http://localhost:8080/message/listMessages?"+formData).then(reponse=>{this.responseMessage(reponse)}).catch(error=>{alert(error);});
  }

  responseMessage(r){
    if(r.data.status === 'OK'){
      const t = r.data.posts.map((tweet, index) =>{
        return (
          <Tweet key={index} author={tweet.authorID} msg={tweet.message} date={tweet.date} getProfile={this.getProfile} s_key={this.state.s_key} m_id ={tweet._id} u_id={this.state.u_id}  deleteMessage={this.deleteMessage}  show={false} showProfile={false}/>
          
       )})
       this.setState({tweets:t}, function () {
         console.log('récupération réussie');
    });
    }
  }


  /*********  *********/

  render() {
    let bouton ;
    let nb
    console.log((this.state.tweets.length))
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

    

  
    
    if(!this.state.follow){
      bouton = (<div>
              <button onClick={this.handleClickFollow}>S'abonner</button>
              </div>);
    }else{
      bouton = (<div>
             <button onClick={this.handleClickUnfollow}>Se désabonner</button>
             </div>);
    }
    return (
      <div id='profil'>
        <div id='profilA' className='alignement'>
          <div className="centre">
          <h2>Profil de {this.state.author}</h2>
          <button onClick={this.handleClick}>Revenir à au fil d'actualité</button>
          <div className='container2'> 
      {this.state.tweets}
        </div> 
          </div>
        </div>
        <div className='alignement' id='profilB'>
          <div className="centre">
        <div>
            <p> Nombre de followers : {this.state.followers_total.length}</p>
                  {nb}
            </div>
        <div>
            <p> {this.state.author} suit {this.state.followings_total.length} personne(s)</p>
                  {abo}
            </div>

                {bouton}
           </div>
           </div>
        </div>
    );
  
}



  
}


export default ProfilePage;
