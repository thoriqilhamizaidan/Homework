import React from "react";

const Song = (props) => {
    return (
  
      <div className="row">
        <div className="card-song">
            <img src={props.image} alt="true"/>
            <h1>{props.title}</h1>
            <h2>Album : {props.album}</h2>
            <h2>Artist : {props.artist}</h2>
            <button class="btn select">Select</button>
        </div>
      </div>
      
    );
  }

export default Song;