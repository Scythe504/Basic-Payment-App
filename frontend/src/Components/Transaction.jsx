import { useState, useCallback } from "react";

export function Transaction(){
    const [amount,setAmount] = useState(0);
    const[msg,setMsg] = useState("")
     const sendMoneyOnClick = useCallback(()=>{
        fetch(`http://localhost:3000/api/v1/account/transfer`,{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body : JSON.stringify({
                'amount' : amount,
                'to' : sessionStorage.getItem('userId')
             })
        }).then((response)=>{
            if(!response.ok){
                throw new Error(response.status);
            }else {
                return response.json();
            }
        }).then((data)=>{
            console.log(data);
            setMsg(data.message);
        }).catch(e=>console.error(e));
    
    },[amount])
   
    return (
        <div>
            <div>
                <h1>Send Money</h1>
            </div>
            <div>
                {sessionStorage.getItem('fullName')}
            </div>
            <div>
                <label htmlFor="AmountSend">Amount(in Rs)</label>
                <input type="number" id="AmountSend" placeholder="Enter Amount" onChange={(e)=>{
                        setAmount(e.target.value);
                }}></input>
                {<button onClick={sendMoneyOnClick}>Send Money</button>}
            </div>
            <p>{msg}</p>
        </div>
    )
}