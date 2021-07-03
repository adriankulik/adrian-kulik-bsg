import './style/style.css';
import ReactPlayer from 'react-player'

function Player() {
    return (
        <div className="player">
            <ReactPlayer controls={true} width={"100%"} height={"100%"} url="https://cd-stream-od.telenorcdn.net/tnfbaod/SF/585db4b3e4b09db0cf348a64/dash_a1.ism/playlist.mpd" />
        </div>
    )
}

export default Player;