import { useEffect, useRef, useState } from "react";
import TestVideo from "../../assets/fps60.mp4";
import styles from "./RecordAnalysis.module.scss";
import ReactPlayer from "react-player";
import { LineChart, Line, CartesianGrid, Legend, Tooltip } from "recharts";
import { Slider } from "@/components/ui/slider";

import PlayIcon from "@/assets/play-fill.svg";
import PauseIcon from "@/assets/pause-fill.svg";

const X_WIDTH = 393 - 16;

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
      <div className={styles.tooltip}>
        {payload.map((p) => (
          <p
            key={p.dataKey}
            className={styles.tooltipLabel}
            style={{ color: p.stroke }}
          >
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
    setIsPlaying(false);

    if (videoRef.current) {
      videoRef.current.seekTo(time);
    }
  };

  const length = data.length;

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!showButton) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowButton(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showButton]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.videoWrapper}
        onClick={() => {
          setShowButton((prev) => !prev);
        }}
      >
        <ReactPlayer
          playing={isPlaying}
          onProgress={(progressProps) => {
            setPlayed(progressProps.played);
          }}
          progressInterval={1000 / 30}
          ref={videoRef}
          width="100%"
          height="100%"
          url={TestVideo}
          controls={false}
          muted
          playsinline
          loop
        />

        <div className={styles.playButtonWrapper}>
          {showButton && (
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? (
                <img color="#ffffff" width={64} alt="" src={PauseIcon} />
              ) : (
                <img color="#ffffff" width={64} alt="" src={PlayIcon} />
              )}
            </button>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <Slider
            style={{
              width: X_WIDTH,
            }}
            value={[played]}
            min={0}
            max={1}
            step={1 / 1_000_000}
            onValueChange={(value) => {
              handleSeek(value[0]);
            }}
          />
        </div>
      </div>

      <LineChart
        width={X_WIDTH}
        height={256}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        onMouseMove={(e) => {
          const x = e.activeCoordinate?.x ?? 0;
          handleSeek(x / X_WIDTH);
        }}
      >
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="root" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="pelvis" stroke="#82ca9d" dot={false} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
        <Tooltip
          defaultIndex={Math.floor(played * (length - 1))}
          content={CustomTooltip}
        />
      </LineChart>
    </div>
  );
}
