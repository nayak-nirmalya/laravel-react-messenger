import { useState } from "react";

import { useEventBus } from "@/EventBus";

export default function Toast({}) {
    const [toasts, setToasts] = useState([]);

    const { on } = useEventBus();

    return (
        <div className="toast min-w-[240px]">
            {toasts.map((toast, index) => (
                <div
                    key={index}
                    className="alert alert-success py-3 px-4 text-gray-100 rounded-md"
                >
                    <span>New message arrived.</span>
                </div>
            ))}
        </div>
    );
}
