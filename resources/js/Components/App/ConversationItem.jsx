const { Link, usePage } = require("@inertiajs/react");
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import UserOptionsDropdown from "./UserOptionsDropdown";

export default function ConversationItem({
    conversation,
    selectedConversation = null,
    online = null,
}) {
    const page = usePage();
    const currentUser = page.props.auth.user;

    let classes = "border-transparent";
    if (selectedConversation) {
        if (
            !selectedConversation.is_group &&
            !conversation.is_group &&
            selectedConversation.id == conversation.id
        ) {
            classes = "border-blue-500 bg-black/20";
        }

        if (
            selectedConversation.is_group &&
            conversation.is_group &&
            selectedConversation.id == conversation.id
        ) {
            classes = "border-blue-500 bg-black/20";
        }
    }

    return <></>;
}
