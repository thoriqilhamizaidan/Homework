import './index.css'
import AlbumName from './props/album'   

import data from '../data/data';


const Index=()=>{
    return (
      <div>
        <AlbumName Img={data.album.images[1].url}
        NameAlbum={data.album.name}
        NameArtist={data.artists[0].name}
        ButtonUrl={data.uri}></AlbumName>
      </div>
    );
  }
  
  export default Index;