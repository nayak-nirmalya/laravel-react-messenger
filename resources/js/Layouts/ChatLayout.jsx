import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export default function Chat({ children }) {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    const [onlineUsers, setOnlineUsers] = useState({});

    console.log("conversations", conversations);
    console.log("selectedConversation", selectedConversation);

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUsersObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );

                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUsersObj };
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedOnlineUsers = { ...prevOnlineUsers };
                    updatedOnlineUsers[user.id] = user;
                    return updatedOnlineUsers;
                });
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedOnlineUsers = { ...prevOnlineUsers };
                    delete updatedOnlineUsers[user.id];
                    return updatedOnlineUsers;
                });
            })
            .error((error) => console.error("Error", error));

        return () => {
            Echo.leave("online");
        };
    }, []);

    return (
        <>
            ChatLayout
            <div>{children}</div>
        </>
    );
}
