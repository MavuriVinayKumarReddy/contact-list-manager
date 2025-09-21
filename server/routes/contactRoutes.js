const express =require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/",async (req,res)=>{
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.json(contact);
    }catch (err){
        res.status(500).json({error : err.message});
    }
});

router.get("/",async (req,res)=>{
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    }catch (err){
        res.status(500).json({error : err.message});
    }
});

router.put("/:id",async (req,res)=>{
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(contact);
    }catch (err){
        res.status(500).json({error : err.message});
    }
});

router.delete("/:id",async (req,res)=>{
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.json(contact);
    }catch (err){
        res.status(500).json({error : err.message});
    }
});

module.exports =router;