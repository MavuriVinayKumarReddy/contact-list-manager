import { useState } from "react";
import axios from "axios";

function AddContact({onAdd}){
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        phone:""
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handlesubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/contacts",formData);
            onAdd(res.data);
            setFormData({name:"",email:"",phone: ""});
        } catch(err){
            console.log(err);
        }
    };

    return(
        <form onSubmit={handlesubmit}>
            <h3>Add New Contact</h3>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

<input
                type="number"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    )

}
export default AddContact;