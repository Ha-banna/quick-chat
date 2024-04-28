import Button from "../components/ui/Button";
import { ImGoogle } from 'react-icons/im';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ButtonLoader from "../components/ui/ButtonLoader";

export default function Login(){
    const nav = useNavigate(); 
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const app = useContext(AppContext);
    const auth = getAuth(app);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });
    
        return () => unsubscribe(); 
    }, [app, auth]);
    

    function googleSignIn(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(()=>{
            nav('/home');
        }).catch((error)=>{
            console.log(error);
        });
    }
    
    return isLoading? <div className=" absolute w-screen h-screen z-10 bg-slate-800 flex justify-center items-center"><ButtonLoader/></div> : currentUser?<Navigate to={'/home'}/>:(
        <div className="bg-slate-800 w-screen h-screen flex flex-col justify-center items-center absolute top-0 pt-14">
            <h1 className="text-rose-600 font-semibold text-3xl mb-2 select-none">Quick<span className="text-sky-500">chat</span></h1>
            <Button onClick={googleSignIn}><span className="mr-2"><ImGoogle/></span> Continue with Google</Button>
        </div>
    );
}
