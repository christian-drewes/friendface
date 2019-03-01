import Header from './Header'
import Footer from './Footer'
import React from 'react';
import Post from './post';
import Giphy from './giphy';



export default class App extends React.Component {
  
  state = {
    value: [],
    temp: "",
    isLoggedOn: false,
    username: "Unknown",
    userpic: '',
    listItems: []
  }

  handleChange = (e) =>{
    this.setState({temp: e.target.value})
  }
  
  handleSubmit = (e) =>{
     this.setState({value: this.state.value.concat({status: this.state.temp, url:''}),
                  temp: ''}, ()=> this.postMap());
     e.preventDefault();

  }

  isLoggedIn = () =>{
    this.setState({isLoggedOn: true})
  }

  handleUserPic = (profpic) =>{
    this.setState({userpic: profpic})
  }

  postMap = () =>{
    const listItems = this.state.value.map((content) => <Post key={content} status={content} 
    userpic={this.state.userpic}
    username = {this.state.username}
  />);

    this.setState({listItems: listItems})
  }
  
	render() {

		return (
			<div className="App">
				<Header loggedin={this.isLoggedIn}  userpic={this.handleUserPic} username={(val) => { this.setState({username: val})}}/>
        {this.state.isLoggedOn ? 
          <div className="Content">
              <form className="statusForm" onSubmit={this.handleSubmit}>
                <label className="statusFormLabel">
                  <input className="statusInput" type="text" value={this.state.temp} onChange={this.handleChange} placeholder="What's on your mind?"/>
                </label>
                <input className="statusSubmit" type="submit" value="Submit" disabled={this.state.temp === ''} />
                <Giphy giphyUrl={(val) => this.setState({value: this.state.value.concat({status: this.state.temp , giphyUrl: val})}, ()=>this.postMap())}/>
              </form>
          </div>
          :
          <div></div>
        }
        <h1>{this.state.listItems}</h1>
				{/* <Footer /> */}
			</div>
		)
	}
}
