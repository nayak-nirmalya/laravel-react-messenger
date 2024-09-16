import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Chat({ children }) {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    console.log("conversations", conversations);
    console.log("selectedConversation", selectedConversation);

    useEffect(() => {
        Echo.join("online")
            .here((users) => console.log("Here", users))
            .joining((user) => console.log("Joining", user))
            .leaving((user) => console.log("Leaving", user))
            .error((error) => console.error("Error", error));
    }, []);

    return (
        <>
            ChatLayout
            <div>{children}</div>
        </>
    );
}
