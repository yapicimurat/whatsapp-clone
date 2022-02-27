import React from "react";
import Login from "./login";
import Register from "./register";


export default class Welcome extends React.Component
{
    constructor(props)
    {
        super(props);
        this.operation = props.operation;

        this.state = {
            operation: this.operation
        };

        this.setOperation = this.setOperation.bind(this);
    }

    setOperation(operationName)
    {
        this.setState({
            operation: operationName
        });
    }

    render()
    {
        let operation = this.state.operation;
        switch(operation)
        {
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
                            setOperation={this.setOperation}/>
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
                            setOperation={this.setOperation}/>
                    </div>
                );
            break;

            default:
                this.setOperation("login");
            break;
        }


        
    }



}