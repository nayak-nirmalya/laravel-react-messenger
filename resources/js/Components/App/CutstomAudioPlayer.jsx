import React, { useState, useRef } from "react";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";

export default function CutstomAudioPlayer({ file, showVolume = true }) {
    const audioRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            console.log(audio, audio.duration);
            setDuration(audio.duration);
            audio.play();
        }
    };
}
