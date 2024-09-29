import { useState } from "react";

import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

function Home({ messages }) {
    const [localMesssages, setLocalMessages] = useState([]);

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages]);

    return (
        <>
            {!messages && (
                <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
                    <div className="text-2xl md:text-4xl p-16 text-slate-200">
                        Please select conversation to see messages
                    </div>
                    <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                </div>
            )}
        </>
    );
}

Home.layout = (page) => (
    <AuthenticatedLayout>
        <ChatLayout children={page} />
    </AuthenticatedLayout>
);

export default Home;
