import React,{useState,useEffect} from 'react';
import './App.css';

import ToggleButton from '@material-ui/lab/ToggleButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

import song from './assets/song.mp3';

function App() {

  //Se que lo deberia hacer con service workers pero no tengo tiempo para aprenderlo y hacerlo bien en 48 horas asi que hice lo mejor que pude con lo que se.


  const [isPlaying,changePlayState] = useState(localStorage.getItem("isPlaying") ?? false);
  const [currentCursor,setCursor] = useState(localStorage.getItem("currentTime") ?? 0);
  
  useEffect(() => {
    const audioElement = document.getElementById("audio-input");
    audioElement.currentTime = currentCursor;
    if(isPlaying){
      audioElement.play();  
    }
  }, []);
  
  const playSong = () => {
    const audioElement = document.getElementById("audio-input");
    localStorage.setItem("isPlaying",true);
    audioElement.play();

  }

  const pauseSong = () => {
    const audioElement = document.getElementById("audio-input");
    localStorage.setItem("isPlaying",false);
    audioElement.pause();
  }

  const setCurrentTime = (time) => {
    localStorage.setItem("currentTime",time.currentTime);
    setCursor(time.currentTime);
  }

  const changePlayStateHandler = () => {
    if(!isPlaying){
      playSong();
    }else{
      pauseSong();
    }
    changePlayState(!isPlaying);  
  }

  return (
    <div className="App">
      <ToggleButton value={isPlaying}
      onChange={changePlayStateHandler}
      >
        {isPlaying ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon  />}
      </ToggleButton>
      <audio id="audio-input" src={song} preload="auto" loop onTimeUpdate={(e) => setCurrentTime(e.target)}>
        <p>Tu navegador no implementa el elemento audio.</p>
      </audio>
    </div>
  );
}

export default App;

