import Login from './login';
import React from 'react';
import ProfilePic from './profilePic';

export default class Header extends React.Component {

	constructor(props){
		super(props)

		this.state = {loggedin: false,
			pics: ''
		}
	}

	isLoggedIn = (val) =>{
		this.setState({pics: 'http://cinephiles.co.in/images/nouser.png' }, function() {this.props.userpic(this.state.pics)})
		this.props.loggedin(val)
	}

	render() {
		return (
			<div className="Header">
				<h1>FRIEND * FACE 🗣</h1>
				<ProfilePic pic={this.state.pics} />
        		<Login pic={(val)=>this.setState({pics: val})} loggedin={this.isLoggedIn} username={(val) => {this.props.username(val)}}/>
			</div>
		)
	}
}