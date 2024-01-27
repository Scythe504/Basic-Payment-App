import { useState } from "react";

export function Signup() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [msg, setMsg] = useState("");

    const submit = (() => {
        fetch("http://localhost:3000/api/v1/user/signup", {
            method: "POST",
            headers: {
                'Application': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify({
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                }).length.toString(),
            },
            body: JSON.stringify({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
        }).then((response) => {
            if (response.ok) {
                setMsg("Signup success");
                return response.json();
            }
            else {
                throw new Error("Invalid inputs");
            }
        }).catch(() => {
            setMsg("Invalid inputs");
            console.log("invalid inputs");
        })
    })
    

    return (
        <div>
            <label htmlFor="email">Email:</label>
            <input name="email" type="text" onChange={(e) => {
                setUsername(e.target.value);
            }} />

            <label htmlFor="password">Password:</label>
            <input name="password" type="password" onChange={(e) => {
                setPassword(e.target.value);
            }} />

            <label htmlFor="firstName">First Name:</label>
            <input name="firstName" type="text" onChange={(e) => {
                setFirstName(e.target.value);
            }} />

            <label htmlFor="lastName">Last Name:</label>
            <input name="lastName" type="text" onChange={(e) => {
                setLastName(e.target.value)
            }} />

            <button onClick={submit}>Submit</button>
            <p>{msg}</p>
        </div>
    )
}
