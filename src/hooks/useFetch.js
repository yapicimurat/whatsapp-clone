import { useState, useEffect } from "react";
import axios from "axios";


export default function useFetch(url, method, data) {

    const [response, setResonse] = useState(null);
    const [error, setError] = useState(false);


    //componentDidMount
    useEffect(async () => {
        try {
            setResponse(axios({
                url: url,
                method: method,
                data: data ?? {},
            }));
        }
        catch (error) {
            setError(error);
        }

    }, []);

    return [response, error];
}