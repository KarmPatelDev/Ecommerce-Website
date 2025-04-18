import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
            if(res.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }

        if(auth?.token){
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path = "" />
};

export default PrivateRoute;