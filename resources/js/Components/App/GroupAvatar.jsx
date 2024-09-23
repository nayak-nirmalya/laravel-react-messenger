import { UserIcon } from "@heroicons/react/24/solid";

export default function GroupAvatar({}) {
    return (
        <div className={`avatar placeholder`}>
            <div className={`bg-gray-400 text-gray-800 rounded-full w-8`}>
                <span className="text-xl">
                    <UserIcon className="w-4" />
                </span>
            </div>
        </div>
    );
}
