import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import UserPicker from "@/Components/App/UserPicker";

import { useEventBus } from "@/EventBus";

export default function GroupModal({ show = false, onClose = () => {} }) {}
