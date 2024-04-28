import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import logo from '../assets/QuickChat-nobg.png';
import Button from './ui/Button';
import AppContext from '../context/AppContext';

export default function Header() {
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const app = useContext(AppContext);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, [app]);

    const handleSignOut = () => {
        const auth = getAuth(app);
        auth.signOut()
            .then(() => {
                nav('/');
            })
            .catch((error) => {
                console.error('Sign out error:', error);
            });
    };

    return (
        <header className="w-screen h-14 bg-transparent flex justify-between items-center border-b border-slate-500 shadow-lg filter backdrop-blur-md absolute z-50">
            <img src={logo} alt="logo" className='w-10 h-10 ml-2' />
            {currentUser && <Button className="mr-2" onClick={handleSignOut}>Sign out</Button>}
        </header>
    );
}
