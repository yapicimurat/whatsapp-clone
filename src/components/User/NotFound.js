import { useNavigate } from "react-router";
import "../../assets/css/style.css";
export default function NotFound() {

    const navigate = useNavigate();


    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <a onClick={() => {
                navigate("/login")
            }}>Go To Login Page</a>
        </div>
    );
}