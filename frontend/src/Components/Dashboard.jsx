import { VscAccount } from 'react-icons/vsc'
import { UserBalance } from './Balance'
import { UserList } from './UsersFilter'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === "/home") {
            sessionStorage.clear();
            navigate("/home");
        } 
        
        if (localStorage.getItem('token') === null) {
            navigate("/");
        }
    }, [localStorage.getItem('token')]);
    return (
        <div>
            <div>
                <span className="bg-black">
                    Payments App
                </span>
                <span>
                    Hello, User
                </span>
                <span>
                    <VscAccount />
                </span>
            </div>
            <div>Your Balance {<UserBalance />}</div>
            <UserList></UserList>
        </div>

    )
}