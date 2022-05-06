import React from "react";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import Main from "../Main/Main";
export default function Welcome({operation}) {
    switch (operation) {
        case "welcome":
            return (
                <small className="welcome-message">WhatsApp-Clone Project</small>
            );
            break;
        case "login":
            return (
                <div className="welcome">
                    <div className="welcome-title">
                        <h4>Welcome to the Whatsapp-clone Project</h4>
                    </div>
                    <Login/>
                </div>
            );
            break;

        case "register":
            return (
                <div className="welcome">
                    <div className="welcome-title">
                        <h4>Welcome to the Whatsapp-clone Project</h4>
                    </div>
                    <Register />
                </div>
            );
            break;

            case "chat":
                return <Main/>;
            break;

        default:
            return (
                <NotFound/>
            );
            break;
    }
}

/*
render() {
        const operation = this.props.operation;
        switch (operation) {
            case "welcome":
                return (
                    <small className="welcome-message">WhatsApp-Clone Project</small>
                );
                break;
            case "login":
                return (
                    <div className="welcome">
                        <div className="welcome-title">
                            <h4>Welcome to the Whatsapp-clone Project</h4>
                        </div>
                        <Login
                            applyUserInformations={this.props.applyUserInformations}
                            connectSocket={this.props.connectSocket}
                            appGoToPage={this.props.appGoToPage}
                            setOperation={this.setOperation} />
                    </div>
                );
                break;

            case "register":
                return (
                    <div className="welcome">
                        <div className="welcome-title">
                            <h4>Welcome to the Whatsapp-clone Project</h4>
                        </div>
                        <Register
                            applyUserInformations={this.props.applyUserInformations}
                            appGoToPage={this.props.appGoToPage}
                            setOperation={this.setOperation} />
                    </div>
                );
                break;

            default:
                <h1>Ooopssss..... 404 Not Found</h1>
                break;
        }
    }

*/