import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const checkAuth = (Component) =>{
    function Wrapper(){
        var user = useSelector(store=>store.auth.user);
        var navigate = useNavigate();
        useEffect(()=>{
            if(!user){
                navigate('/');
            }
        },[user]);
        return <Component/>;
    }
    return Wrapper;
}

export default checkAuth;