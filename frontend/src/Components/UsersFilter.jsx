import { useState,useEffect, useCallback } from "react";
import { otherUser } from "../store/Atoms/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function UserList() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [word,setWord] = useState("")
    const setName = useSetRecoilState(otherUser);
    useEffect(() => {
        async function fetchList() {
            const response = await fetch(`http://localhost:3000/api/v1/user/bulk/?filter=${word}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            else {
                const data = await response.json();
                setUserData(data.user);
            }
        }
        fetchList().catch(e => console.error(e));
    }, [word]);

    const handleClick = useCallback(function ({userId , firstName, lastName}){
        sessionStorage.setItem('userId' , userId)
        setName(firstName + lastName);
        sessionStorage.setItem('fullName', firstName +" "+ lastName);
        navigate("/transactions");
    },[])
    
    const usersLists = userData.map(user =>
        <li key={user._id}>
            {user.firstName} {user.lastName} <span><button onClick={()=>handleClick({userId : user._id, firstName : user.firstName, lastName : user.lastName})}>Send</button></span>
        </li>
    )
    
    return (
        <div>
            <label htmlFor="filterList">Users</label>
            <input id="filterList" placeholder="Search for users" onChange={(e=>setWord(e.target.value))}></input>
            <ul>
                {usersLists}
            </ul>
        </div>
    )
}