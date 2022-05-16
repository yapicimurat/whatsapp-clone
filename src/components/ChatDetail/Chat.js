import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
const MESSAGE_TYPES = {
    ME: "me",
    OTHER: "other"
}


/*
type="me"
isOwner={isOwner}
userID={userID}
username={username}
singleMessage={message}

*/
export default function Chat({ type, isOwner, userID, username, singleMessage }) {

    const isToday = (date) => {
        let result = false;
        const today = new Date();
        if (date.getDay() == today.getDay() &&
            date.getMonth() == today.getMonth() &&
            date.getFullYear() == today.getFullYear()) {
            result = true;
        }
        return result;

    };
    const date = new Date(singleMessage.datetime);
    const time = (isToday(date)) ? date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
    }) : date.toLocaleString();

    if (type === MESSAGE_TYPES.ME) {
        return (
            <div className="message-row">
                <div className="message-area me">
                    <FontAwesomeIcon className="message-icon right-side" icon={icons.faCaretDown} />
                    <div className="message">{singleMessage.message}</div>
                    <div className="message-time"><div className="time">{time}</div></div>
                </div>
            </div>

        );
    }
    else if (type === MESSAGE_TYPES.OTHER) {
        return (
            <div className="message-row">
                <div className="message-area other">
                    <FontAwesomeIcon className="message-icon left-side" icon={icons.faCaretDown} />
                    <div className="message">{singleMessage.message}</div>
                    <div className="message-time"><div className="time">{time}</div></div>
                </div>
            </div>
        );
    }
}

