import {useState} from "react";
import {NewTicket} from "./model/Ticket";


type Props ={
    addTicket:(newTicket: NewTicket) => void
}

export default function AddTicket(props: Props) {

    const [name, setName] = useState<string>("")
   const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [customer, setCustomer] = useState<string>("")
    const [number, setNumber] = useState<string>("")

    function onSaveTicket(){
      const newTicket: NewTicket = {name: name, title: title,content:content,phone:phone,email:email,customer:customer,number:number, status: "OPEN"}

     props.addTicket(newTicket)
    }



    return (

        <div>

            <input value={name} onChange={(event)=>{setName(event.target.value)}}/>
            <input value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
            <input value={content} onChange={(event)=>{setContent(event.target.value)}}/>
            <input value={phone} onChange={(event)=>{setPhone(event.target.value)}}/>
            <input value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            <input value={customer} onChange={(event)=>{setCustomer(event.target.value)}}/>
            <input value={number} onChange={(event)=>{setNumber(event.target.value)}}/>
            <button onClick={onSaveTicket}>Save</button>


        </div>

    )
}