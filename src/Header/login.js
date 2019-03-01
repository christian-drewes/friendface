import React from 'react';

export default class Login extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      Username: '',
      temp: '',
      loggedin: false,
      picUrl: '',
      tempPicUrl: ''
    }
  }



  handleChange = (e) =>{
    this.setState({temp: e.target.value})
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    this.setState({Username: this.state.temp, loggedin: true }, function(){this.props.username(this.state.Username)})
    this.props.loggedin(this.state.loggedin)
  }

  handlePicChange = (e) =>{
    const picPath = e.target.value
    const removedFake = picPath.replace("C:\\fakepath\\", "file:///C:/Users/christian.drewes/Downloads/")

    this.setState({tempPicUrl: e.target.result})
    

  }

  handlePicSubmit = (e) =>{
    console.log(this.state.tempPicUrl)
    this.setState({picUrl: this.state.tempPicUrl}, () => this.props.pic(this.state.picUrl))
    //e.preventDefault()
  }
    
  render(){
    return(
      <div className="login">
            <span >{this.state.loggedin ? this.state.Username : "Log in" }</span>
            <div className="dropdown-content" >
              <form onSubmit={this.handleSubmit}>
                {this.state.loggedin ? 
                  //Picture upload
                  <form onSubmit={this.handlePicSubmit}>
                    <input  style={{color: 'black'}} type ="file" name="pic" accept="image/*" file="" onChange={this.handlePicChange}></input>
                    <input type="submit"></input>
                  </form> : 
                  //Username
                  <div className="usernameText"><input type="text" value={this.state.temp} onChange={this.handleChange} placeholder="Username" />
                <input type="submit" className="statusSubmit"/></div>}
              </form>
            </div>
          </div>
    )
  }
  
  }
  