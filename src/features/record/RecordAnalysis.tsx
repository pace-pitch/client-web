import { useRef, useState } from "react";
import TestVideo from "../../assets/fps60.mp4";
import styles from "./RecordAnalysis.module.scss";
import ReactPlayer from "react-player";

export function RecordAnalysis() {
  const videoRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);

  const handleSeek = (time: number) => {
    setPlayed(time);
    if (videoRef.current) {
      videoRef.current.seekTo(time);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        playing={isPlaying}
        onProgress={(progressProps) => {
          setPlayed(progressProps.played);
        }}
        progressInterval={1000 / 30}
        ref={videoRef}
        width="100%"
        height="auto"
        url={TestVideo}
        loop
      />
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        재생
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={1 / 1_000_000}
        value={played}
        onChange={(e) => {
          handleSeek(parseFloat(e.target.value));
        }}
      />
    </div>
  );
}
