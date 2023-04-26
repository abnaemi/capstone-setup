import {useState} from "react";
import {NewTicket, Ticket} from "./model/Ticket";


type Props ={
    addTicket:(newTicket: NewTicket) => void
}

export default function AddTicket(props: Props) {

   const [title, setTitle] = useState<string>("")

    function onSaveTicket(){
      const newTicket: NewTicket = {title: title, status: "OPEN"}

     props.addTicket(newTicket)
    }



    return (

        <div>

            <input value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
            <button onClick={onSaveTicket}>Save</button>

        </div>

    )
}