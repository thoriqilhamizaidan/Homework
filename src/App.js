import './App.css';
import data from "./data/spotify";
import Song from "./components/song/index";
import SearchBar from './components/search/index';
import React, { useEffect } from 'react';

function App() {
    const spotifySearch = new SearchBar();

    const CLIENT_ID = "c3674ca69601470ebbf98c96ec75c3bd";

    const renderResult = () => {
        console.log("TESTING");
        return spotifySearch.state.result.map(data => (
            <div key={data.album.id}><img src={data.album.images[2].url}></img></div>
            
        ))
    }

    useEffect(() => {
        const hash = window.location.hash
        let tokenIn = window.localStorage.getItem("token")
    
        if (!tokenIn && hash) {
            tokenIn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = "";
            console.log("URI change");
            window.localStorage.setItem("token", tokenIn);
        }
        console.log(tokenIn);
        spotifySearch.receiveToken(tokenIn);
        console.log(spotifySearch.state);
      })

    const logout = () => {
        spotifySearch.clearToken();
        window.localStorage.removeItem("token");
    }  

    return(
        <div className='container'>
            
            <a className="btn login" role="button" href={`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`}>Login to Spotify</a>
            <button className="btn logout" onClick={logout}>Logout</button>

            <form onSubmit={spotifySearch.searchCall}>
                <input type="text" onChange={event => spotifySearch.receiveSearchKey(event.target.value)}/>
                <button className="btn search" type={"submit"}>Search</button>
            </form>
            
            {renderResult()}
            <div>
                {data.map((d) => (
                <Song image={d.album.images[0].url} album={d.name} artist={d.artists[0]?.name} title={d.album.name} key={d.album.name}/>
                ))}
            </div>

        </div>
    )
}


export default App;