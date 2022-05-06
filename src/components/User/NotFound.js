import { useSelector } from "react-redux";
import "../../assets/css/style.css";
export default function NotFound() {

    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <a href="/login">Go To Login Page</a>
        </div>
    );
}