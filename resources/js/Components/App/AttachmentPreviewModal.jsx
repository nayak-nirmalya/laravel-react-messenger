import { Dialog, Transition } from "@headlessui/react";
import {
    PaperClipIcon,
    XMarkIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useEffect, useMemo, useState } from "react";

import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helpers";

export default function AttachmentPreviewModal({
    attachments,
    index,
    show = false,
    onClose = () => {},
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const attachment = useMemo(() => {
        return attachments[currentIndex];
    }, [attachments, currentIndex]);

    const previewableAttachments = useMemo(() => {
        return attachments.filter((attachment) => isPreviewable(attachment));
    }, [attachments]);

    const close = () => {
        onClose();
    };

    const prev = () => {
        if (currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    };

    const next = () => {
        if (currentIndex === previewableAttachments.length - 1) return;
        setCurrentIndex(currentIndex + 1);
    };
}
