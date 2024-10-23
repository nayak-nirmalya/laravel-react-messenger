import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import axios from "axios";

import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import GroupDescriptionPopover from "./GroupDescriptionPopover";
import GroupUsersPopover from "./GroupUsersPopover";

export default function ConversationHeader({ selectedConversation }) {
    const onDeleteGroup = () => {
        if (!window.confirm("Are you sure you want to delete this group?")) {
            return;
        }

        axios
            .delete(route("group.destroy", selectedConversation.id))
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error("[onDeleteGroup]", err);
            });
    };

    return (
        <>
            {selectedConversation && (
                <div className="p-3 flex justify-between items-center border-b border-r-slate-700">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("dashboard")}
                            className="inline-block sm:hidden"
                        >
                            <ArrowLeftIcon className="w-6" />
                        </Link>
                        {selectedConversation.is_user && (
                            <UserAvatar user={selectedConversation} />
                        )}
                        {selectedConversation.is_group && <GroupAvatar />}
                        <div>
                            <h3>{selectedConversation.name}</h3>
                            {selectedConversation.is_group && (
                                <p className="text-xs text-gray-500">
                                    {selectedConversation.users.length} members
                                </p>
                            )}
                        </div>
                    </div>
                    {selectedConversation.is_group && (
                        <div className="flex gap-3">
                            <GroupDescriptionPopover
                                description={selectedConversation.description}
                            />
                            <GroupUsersPopover
                                users={selectedConversation.users}
                            />
                            {selectedConversation.owner_id == authUser.id && (
                                <>
                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Edit Group"
                                    >
                                        <button
                                            className="text-gray-400 hover:text-gray-200"
                                            onClick={(ev) =>
                                                emit(
                                                    "GroupModal.show",
                                                    selectedConversation
                                                )
                                            }
                                        >
                                            <PencilSquareIcon className="w-4" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Delete Group"
                                    >
                                        <button
                                            onClick={onDeleteGroup}
                                            className="text-gray-400 hover:text-gray-200"
                                        >
                                            <TrashIcon className="w-4" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
