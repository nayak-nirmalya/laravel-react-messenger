import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { router, usePage } from "@inertiajs/react";

import TextInput from "@/Components/TextInput";
import ConversationItem from "@/Components/App/ConversationItem";
import GroupModal from "@/Components/App/GroupModal";

import { useEventBus } from "@/EventBus";

export default function Chat({ children }) {
    const page = usePage();
    const { on, emit } = useEventBus();

    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    const [onlineUsers, setOnlineUsers] = useState({});
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [showGroupModal, setShowGroupModal] = useState(false);

    const isUserOnline = (userId) => onlineUsers[userId];

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation) => {
                return conversation.name.toLowerCase().includes(search);
            })
        );
    };

    const messageCreated = (message) => {
        setLocalConversations((oldUsers) => {
            // prettier-ignore
            return oldUsers.map((user) => {
                if (
                    message.receiver_id &&
                    !user.is_group &&
                    (user.id == message.sender_id || user.id == message.receiver_id)
                ) {
                    user.last_message = message.message;
                    user.last_message_date = message.created_at;
                    return user;
                }

                if (
                    message.group_id &&
                    user.is_group &&
                    user.id == message.group_id
                ) {
                    user.last_message = message.message;
                    user.last_message_date = message.created_at;
                    return user;
                }

                return user;
            });
        });
    };

    const messageDeleted = ({ prevMessage }) => {
        if (!prevMessage) return;

        messageCreated(prevMessage);
    };

    useEffect(() => {
        const offCreated = on("message.created", messageCreated);
        const offDeleted = on("message.deleted", messageDeleted);
        const offModalShow = on("GroupModal.show", (group) => {
            setShowGroupModal(true);
        });

        const offGroupDelete = on("group.deleted", ({ id, name }) => {
            setLocalConversations((oldConversations) => {
                return oldConversations.filter(
                    (conversation) => conversation.id != id
                );
            });

            emit("toast.show", `Group "${name}" was deleted.`);

            if (
                !selectedConversation ||
                (selectedConversation.is_group && selectedConversation.id == id)
            ) {
                router.visit(route("dashboard"));
            }
        });

        return () => {
            offCreated();
            offDeleted();
            offModalShow();
            offGroupDelete();
        };
    }, [on]);

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    b.last_message_date.localeCompare(a.last_message_date);
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );
    }, [localConversations]);

    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

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
            <div className="flex-1 w-full flex overflow-hidden">
                <div
                    className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-col overflow-hidden ${
                        selectedConversation ? "-ml-[100%] sm:ml-0" : ""
                    }`}
                >
                    <div className="flex items-center justify-between py-2 px-3 text-xl font-medium text-gray-200">
                        My Conversations
                        <div
                            className="tooltip tooltip-left"
                            data-tip="Create New Group"
                        >
                            <button
                                onClick={(ev) => setShowGroupModal(true)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Filter users and groups"
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations &&
                            sortedConversations.map((conversation) => (
                                <ConversationItem
                                    key={`${
                                        conversation.is_group
                                            ? "group_"
                                            : "user_"
                                    }${conversation.id}`}
                                    conversation={conversation}
                                    online={!!isUserOnline(conversation.id)}
                                    selectedConversation={selectedConversation}
                                />
                            ))}
                    </div>
                </div>
                <div className="flex flex-1 flex-col overflow-hidden">
                    {children}
                </div>
            </div>
            <GroupModal
                show={showGroupModal}
                onClose={() => setShowGroupModal(false)}
            />
        </>
    );
}
