import './App.css';
import data from "./data/spotify";
import Song from "./components/song/index";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

    const CLIENT_ID = "c3674ca69601470ebbf98c96ec75c3bd";

    const [token, setToken] = useState("");
    const [searchKeyword, setSearchKey] = useState("");

    const [songResult, setResult] = useState([]);
    const [selectedSong, setSelectedSong] = useState([]);

    const Songs = (props) => {
        return (
          <div className="row">
            <div className="card-song">
                <img src={props.image} alt="true"/>
                <h1>{props.title}</h1>
                <h2>Album : {props.album}</h2>
                <h2>Artist : {props.artist}</h2>
                {!props.selected ? <button className='btn select' type="submit" onClick={()=>AddSongToSelected(props)}>Select</button> : <button type="submit">Deselect</button>}
            </div>
          </div>
          
        );
      }


      useEffect(() => {
        const hash = window.location.hash
        let tokenIn = window.localStorage.getItem("token")
    
        if (!tokenIn && hash) {
            tokenIn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = "";
            console.log("URI change");
            
            window.localStorage.setItem("token", tokenIn)
        }
        console.log(`tokenIn ${tokenIn}`)
        setToken(tokenIn)
        console.log(`token ${token}`)
      },[])

      const CallSpotifySearch = (e) => {
        e.preventDefault();
        axios.get(`https://api.spotify.com/v1/search`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKeyword,
                type: "track"
            }
        }).then((response)=>{
            const searchResult = response.data.tracks.items;
            console.log(searchResult);
            if(response){
                setResult(searchResult);
            }
        }).catch((e) => console.log(e));
    }

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    }  

    function AddSongToSelected(props){
        let newSelectedSong = selectedSong;
        newSelectedSong.push(props);
        setSelectedSong(newSelectedSong);
        console.log(selectedSong);
    }

    return(
        <div className='container'>
            {!token ?
                    <a className='btn login' href={`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`}>Login
                        to Spotify</a>
                    : <button className='btn logout' onClick={logout}>Logout</button>}
            
            <h1>Playlist</h1>

            <form onSubmit={CallSpotifySearch}>
                <input type="text" placeholder='Search..' onChange={e => setSearchKey(e.target.value)}></input>
                <button className='btn search' type={"submit"}>Search</button>
            </form>

            <div>
                {data.map((d) => (
                <Song image={d.album.images[0].url} album={d.name} artist={d.artists[0]?.name} title={d.album.name} key={d.album.name}/>
                ))}
            </div>
            
            <div>
                {!selectedSong && selectedSong.map((data) => 
                <Songs image={data.album.images[0].url} album={data.name} artist={data.artists[0]?.name} title={data.album.name} key={data.album.name}/>
                   )}
            </div>
            
            <div>
                {songResult.map((data) => 
                <Song image={data.album.images[0].url} album={data.name} artist={data.artists[0]?.name} title={data.album.name} key={data.album.name}/>
                        )
                    }
            </div>
            
        </div>
    )
}


export default App;