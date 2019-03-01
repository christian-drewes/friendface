import React from 'react';

export default class Post extends React.Component{

    constructor(props){
        super(props)
        const firstDate = Date.now()

        console.log(firstDate)

        this.state = {
            firstDate: firstDate 
        }
    }

    convertSec(currentd){

        const calcTime = currentd - this.state.firstDate

        if(Math.floor(calcTime/60000) < 1){
            return Math.floor(calcTime/600) + " seconds ago"
        }else{
            return Math.floor(calcTime/60000) + " minutes ago"
        }
    }


    render(){

        const currentd = Date.now()

        return(
            <div className="ulStyle" >
                <img src={this.props.userpic} width="50px"></img>
                <label className="post-username">{this.props.username}</label>
                <div className="postContent">{this.props.status.status}
                    <div><img  style={{borderRadius: "15px"}} src={this.props.status.giphyUrl}></img></div>
                </div>
                <div className="post-time">{`Submitted ${this.convertSec(currentd)}`}</div>
            </div>
        )
    }
}


