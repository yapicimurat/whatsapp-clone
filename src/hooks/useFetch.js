import { useState } from "react";
import axios from "axios";


export default async function useFetch(url, method, data) {

    const [error, setError] = useState(null);
    try {
        // setResponse(await axios({
        //     url: url,
        //     method: method,
        //     data: data ?? {},
        // }));
    }
    catch (error) {
        
        setError(error);
    }
    return [response, error];
}