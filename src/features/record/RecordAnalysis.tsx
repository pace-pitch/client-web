import { useRef, useState } from "react";
import TestVideo from "../../assets/fps60.mp4";
import styles from "./RecordAnalysis.module.scss";
import ReactPlayer from "react-player";
import { LineChart, Line, CartesianGrid, Legend, Tooltip } from "recharts";

const X_WIDTH = 350;

const data = [
  {
    root: 60,
    pelvis: 60,
  },
  {
    root: 60,
    pelvis: 65,
  },
  {
    root: 60,
    pelvis: 65,
  },
  {
    root: 60,
    pelvis: 70,
  },
  {
    root: 60,
    pelvis: 70,
  },
  {
    root: 60,
    pelvis: 70,
  },
  {
    root: 80,
    pelvis: 80,
  },
  {
    root: 120,
    pelvis: 100,
  },
  {
    root: 110,
    pelvis: 105,
  },
  {
    root: 100,
    pelvis: 110,
  },
  {
    root: 270,
    pelvis: 120,
  },
  {
    root: 100,
    pelvis: 290,
  },
  {
    root: 20,
    pelvis: 20,
  },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: {
    name?: string;
    value?: string;
    dataKey?: string | number;
    stroke?: string;
  }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div>
        {payload.map((p) => (
          <p key={p.dataKey} style={{ color: p.stroke }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

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
        style={{
          width: X_WIDTH,
        }}
        type="range"
        min={0}
        max={1}
        step={1 / 1_000_000}
        value={played}
        onChange={(e) => {
          handleSeek(parseFloat(e.target.value));
          setIsPlaying(false);
        }}
      />
      <LineChart
        width={X_WIDTH}
        height={256}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        onMouseMove={(e) => {
          console.log(e);
          const x = e.activeCoordinate?.x ?? 0;
          handleSeek(x / X_WIDTH);
        }}
      >
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="root" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="pelvis" stroke="#82ca9d" dot={false} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
        <Tooltip content={CustomTooltip} />
      </LineChart>
    </div>
  );
}
