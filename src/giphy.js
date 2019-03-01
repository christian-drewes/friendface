import React from 'react';
import '../src/CSS/giphy.css';

const resourceUri = "Https://api.giphy.com/v1/gifs/"
const giphyApiKey = "&api_key=MOyg90yFeca9AatXdTIUEiUaNG21KQCF"


export default class Giphy extends React.Component{

    state = {
        giphySearch: '',
        giphyData: [],
        temp: '',
        submitted: '',
        isGiphyButtonClicked: false,
        listItems: []
    }
    
    fetchGiphy = async() =>{

        const apiCall = await fetch(`${resourceUri}search?q=${this.state.giphySearch}&rating=pg${giphyApiKey}`);
        const giphy = await apiCall.json();

        this.setState({giphyData: giphy.data}, ()=> this.mapGiphyImages())
        
    }

    fetchTrending = async() =>{
        const apiCall = await fetch(`Https://api.giphy.com/v1/gifs/trending?&rating=pg${giphyApiKey}`);
        const giphy = await apiCall.json();

        this.setState({giphyData: giphy.data}, ()=> this.mapGiphyImages())
    
    }

    componentWillMount(){
        this.fetchTrending()
    }

    handleChange = (e) =>{
        this.setState({temp: e.target.value})
    }
      
    handleSubmit = (e) =>{
        e.preventDefault();
        let tempState = this.state.temp;
        this.setState({giphySearch: tempState,
            temp: ''}, ()=>this.fetchGiphy());
    }

    handleGiphyButton = () =>{
        this.setState({isGiphyButtonClicked: 
            this.state.isGiphyButtonClicked ? false : true
        });
    }

    handleGiphyImageClick = (e) =>{
        e.preventDefault();
        this.props.giphyUrl(e.target.src)

        this.setState({        
            giphySearch: '',
            giphyData: [],
            temp: '',
            submitted: '',
            isGiphyButtonClicked: false,
            listItems: []})

    }

    mapGiphyImages = () =>{
        //console.log(this.state.giphyData.data)
        const listItems = this.state.giphyData.map(val => 
        <img key={val.images.fixed_width.url} src={val.images.fixed_width.url} onClick={this.handleGiphyImageClick} />)

        this.setState({listItems: listItems})
    }
    
    render(){
        return(
            <div className="giphy">
                <button className="giphyButton" type="button" onClick={this.handleGiphyButton} >Giphy!</button>
                <div className="dropdown-content-giphy" style={{display: this.state.isGiphyButtonClicked ? "" : "none" }}>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        <input className="giphyInput" type="text" value={this.state.temp} onChange={this.handleChange} placeholder="Search for Gif"></input>
                    </label>
                    <input className="giphySubmit" type="submit" value="Submit" disabled={this.state.temp === ''} />
                    </form>
                    <h1>{this.state.listItems}</h1>
                </div>
            </div>
            
        )
    
    }
}