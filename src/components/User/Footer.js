
import { useSelector } from "react-redux";


export default function Footer(){
    const {username} = useSelector(state => {
        console.log("kontrol yapildi....");
        return state.userReducer
    });

    return (
        <div>{(!username) ? "username henuz yok!!!" : username }</div>
    );
}