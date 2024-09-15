import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Chat({ children }) {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    console.log("conversations", conversations);
    console.log("selectedConversation", selectedConversation);

    return (
        <AuthenticatedLayout>
            ChatLayout
            <div>{children}</div>
        </AuthenticatedLayout>
    );
}
