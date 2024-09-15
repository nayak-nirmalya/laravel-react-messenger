import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Home({ auth }) {
    return <>Messages</>;
}

Home.layout = (page) => (
    <AuthenticatedLayout>
        <ChatLayout children={page} />
    </AuthenticatedLayout>
);

export default Home;
