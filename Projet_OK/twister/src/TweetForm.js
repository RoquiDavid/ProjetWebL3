import React, { Component } from 'react';
import './App.css';


class TweetForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        msg: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.addTweet(this.state.msg);
    this.setState({msg: ''});
      
  }

  handleChange(event) {
      this.setState({msg: event.target.value})
  }

  render() {
    return (
      <div className="addT">
        <form onSubmit={this.handleClick}>
            <input type='text' placeholder="Entrer votre Tweet" value={this.state.msg} onChange={this.handleChange} />
            <input type="submit" value="Poster"/>
        </form>
      </div>
    );
  }
  
}


export default TweetForm;
