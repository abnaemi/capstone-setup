import {useState} from "react";
import {NewTicket} from "./model/Ticket";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";


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

            Name: <Input value={name} onChange={(event)=>{setName(event.target.value)}}/>
           Title: <Input value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
           Content: <Input value={content} onChange={(event)=>{setContent(event.target.value)}}/>
           Phone: <Input value={phone} onChange={(event)=>{setPhone(event.target.value)}}/>
           Email: <Input value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            Customer:<Input value={customer} onChange={(event)=>{setCustomer(event.target.value)}}/>
            Number:<Input value={number} onChange={(event)=>{setNumber(event.target.value)}}/>
            <Button variant="outlined" onClick={onSaveTicket}>Save</Button>


        </div>

    )
}