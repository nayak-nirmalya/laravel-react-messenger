import { MicrophoneIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function AudioRecorder() {
    const [recording, setRecording] = useState(false);

    return (
        <button>
            {recording && <StopCircleIcon className="w-6 text-red-600" />}
            {!recording && <MicrophoneIcon className="w-6" />}
        </button>
    );
}
