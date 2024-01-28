
import { useState } from "react"
import { Link } from "react-router-dom";

function SignupText() {
    return <Link to={"/user/signup"}>Signup</Link>
}
export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("")
    const [link, setLink] = useState(<></>)
    //Posting signing req
    const submit = () => {
        fetch("http://localhost:3000/api/v1/user/signin", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        }).then((response) => {
            //Signup status msg
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            localStorage.setItem('token', data.token);
            setMsg('Signed in succesfully, redirecting you to');
        }).catch((e) => {
            setMsg(`Invalid inputs/signup instead`);
            setLink(<SignupText />);
            console.log(e);
        })

    }
    return (
        <div className=" bg-black h-screen w-screen inline-flex">
            <div className="bg-white mx-auto my-auto pr-16 pl-16 py-36 
            rounded-xl text-2xl drop-shadow-md shadow-white
             border-black border-x-4 border-y-4 shadow-xl">

                <div className="font-bold text-4xl pt-6">SignIn</div>
                <label className="text-black font-medium" htmlFor="email">Email:</label><br/>
                <input className=" border-x-2 border-y-2 rounded-lg border-slate-950" name="email" id="emailSignin" type="text" placeholder="email@gmail.com" onChange={(e) => {
                    setUsername(e.target.value)
                }} /><br />
                <br />

                <label className="text-black font-medium" htmlFor="password">Password:</label><br />
                <input className=" border-x-2 border-y-2 rounded-lg border-slate-950" name="password" id="passwordSignin" type="password" onChange={(e) => {
                    setPassword(e.target.value)
                }} /> <br />
                <br />
                 <button onClick={submit} type="button" class=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Submit</button>

                <p>{msg}{link}</p>

            </div>
        </div>
    )
}
