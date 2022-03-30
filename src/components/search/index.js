import {Component} from 'react';
import axios from 'axios';

class SearchBar extends Component{
    state = {
        searchKey: "", token: "", result: []}

    receiveToken(tokenIn){
        console.log("halo token");
        let prevState = this.state;
        this.state = {searchKey:prevState.searchKey, token:tokenIn, result: prevState.result};
        console.log( this.state);
    };

    clearToken(){
        this.state = {searchKey:"", token:"", result: []};
        console.log( this.state);
    }

    receiveSearchKey(skIn){
        console.log("halo skIn");
        let prevState = this.state;
        this.state = {searchKey:skIn, token:prevState.token, result: prevState.result};
        console.log( this.state);
    };
    
    receiveArtistData(artistDataIn){
        console.log("halo data");
        let prevState = this.state;
        let newSongList = artistDataIn.tracks.items;
        this.state = {searchKey:prevState.searchKey, token:prevState.token, result: newSongList};
        console.log(this.state);
    }

    searchCall = async (event) =>{
        console.log(this.state.token);
        event.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            },
            params: {
                q: this.state.searchKey,
                type: "track"
            }
        })
        this.receiveArtistData(data);
    }
}

export default SearchBar;