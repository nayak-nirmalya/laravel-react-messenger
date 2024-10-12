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
}) {}
