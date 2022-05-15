
import { useSelector } from "react-redux";


export default function Footer(){
    const {username} = useSelector(state => {
        return state.userReducer
    });

    return (
        <div>{(!username) ? "username henuz yok!!!" : username }</div>
    );
}