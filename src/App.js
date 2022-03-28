import React from "react";
import Data from "./data/spotify";
import Song from "./components/album/song";
import './App.css';

function App() {
  
    return (
      <div className="container">
        <div className="Header">
          <h1>Song Playlist</h1>
		    </div>

        <div>
          {Data.map((d) => (
          <Song image={d.album.images[0].url} album={d.name} artist={d.artists[0]?.name} title={d.album.name} key={d.album.name}/>
          ))}
        </div>
      </div>
    );
}

export default App;