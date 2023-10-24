import {ReactNode} from "react";
import {MessagesMessage} from "primereact/messages";
import {Toast} from "primereact/toast";


type MessageType = 'info' | 'success' | 'warn' | 'error';
type msgs={
    info: MessagesMessage,
    success: MessagesMessage,
    warn: MessagesMessage,
    error: MessagesMessage,
}
function getToastMessage(type: MessageType, detail?: ReactNode, summary?: ReactNode) : MessagesMessage {
    const messages: msgs = {
        info: {severity: 'info', summary: summary, detail: detail,  life: 3000 },
        success: {  severity: 'success', summary: summary, detail: detail,  life: 3000 },
        warn: {  severity: 'warn', summary: summary, detail: detail, life: 3000 },
        error: {  severity: 'error', summary: summary,detail: detail,  life: 3000 },
    };

    return messages[type];
};

export function toastMessage(toast : Toast, type: MessageType, detail?: ReactNode, summary?: ReactNode){
  return toast.show(
        getToastMessage(type, detail, summary)
    )
}
