
import { useState } from "react"
import { Link } from "react-router-dom";

function SignupText(){
    return <Link to={"/user/signup"}>Signup</Link>
}
export function Signin(){
    const [username,setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [msg,setMsg] = useState("")
    const [link, setLink] = useState(<></>)
    //Posting signing req
    const submit = () => {
        fetch("http://localhost:3000/api/v1/user/signin",{
            method : "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
              },
            body : JSON.stringify({
                username : username,
                password : password
            }),
        }).then((response)=>{
        //Signup status msg
        if(response.ok){
            return response.json();
        }}).then((data)=>{
            localStorage.setItem('token', data.token);
            setMsg('Signed in succesfully, redirecting you to');
        }).catch((e)=>{
            setMsg(`Invalid inputs/signup instead`);
            setLink(<SignupText/>);
            console.log(e);
        })

    }
    return (
        <div className="bg-black h-screen w-screen">
            <div className="bg-white">


            <label className= "text-black" htmlFor="email">Email:</label>
            <input name = "email" id = "emailSignin"type = "text" placeholder="email@gmail.com" onChange={(e)=> {
                setUsername(e.target.value)
            }}/><br/>

            <label className="text-black"htmlFor="password">Password:</label>
            <input className = "bg-black" name = "password" id = "passwordSignin" type = "password" onChange={(e)=> {
                setPassword(e.target.value)
            }}/> <br />

            <button onClick = {submit}>Submit</button>
            <p>{msg}{link}</p>
            
            </div>
        </div>
    )}
