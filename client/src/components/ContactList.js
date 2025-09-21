import React , {useEffect,useState} from "react";
import axios from "axios";
import AddContact from "../AddContact";

const ContactList = () =>{
    const [contacts,setContacts] = useState([]);
    const [editingId,setEditingId] = useState(null);
    const [editData,setEditData] = useState({name:"",email:"",phone:""});

    useEffect(()=>{
        fenchContacts();
    },[]);
    const fenchContacts = async ()=>{
        try{
            const res = await axios.get("http://localhost:5000/api/contacts");
            setContacts(res.data);
        } catch(err){
            console.log("Error fenching Contacts",err);
        }
    };
       
    const handleAdd = (newContact) =>{
        setContacts([...contacts,newContact])
    };

    const handlleDelete= async (id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);
            setContacts(contacts.filter((c)=>c._id!==id));
        } catch(err){
            console.error("Error Deleting Contact",err);
        }
    };
    
    const handleEditClick = (contact) =>{
        setEditingId(contact._id);
        setEditData({name:contact.name,email:contact.email,phone:contact.phone});
    };

    const handleEditChange = (e)=>{
        setEditData({...editData,[e.target.name]:e.target.value});
    };

    const handleEditSave = async (id)=>{
        try{
            const res = await axios.put(`http://localhost/api/contacts/${id}`,editData);
             setContacts(contacts.map((c)=> (c._id===id?res.data:c)));
        } catch(err){
            console.error("Error Updating Data",err);
        } finally{
            setEditingId(null);
        }
    };

    return(
        <div style={{padding: "20px"}}>

            <h3>Contact List</h3>
            <AddContact onAdd={handleAdd} />
            
            {contacts.length===0?(
                <p>No Contacts yet.</p>
            ) : (
                <ul>
                    {contacts.map(contact =>(
                        <li key = {contact._id}>
                            {editingId === contact._id?(
                                <>
                                    <input 
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleEditChange}
                                    />
                                    <input 
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleEditChange}
                                    />
                                    <input 
                                        type="number"
                                        name="phone"
                                        value={editData.phone}
                                        onChange={handleEditChange}
                                    />
                                    <button onClick={()=>handleEditSave(contact._id)}>Save</button>
                                    <button onClick={()=>setEditingId(null)}>Cancel</button>
                                </>
                            ):(
                                <>
                                    {contact.name} - {contact.email} - {contact.phone}
                                    <button onClick={()=>handleEditClick(contact)}>Edit</button>
                                    <button onClick={()=>handlleDelete(contact._id)}>Delete</button>
                                </>
                                
                            )
                            }
                        </li>
                    ))}
                </ul>
            )
            
            }
        </div>
    );

    };
    export default ContactList;