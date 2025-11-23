//import lib
const express=require("express");
const linkcontroller=require("../controller/linkController")
const router=express.Router();

//api
//api

//get list link

//url  :api/links
router.get("/links" , linkcontroller.linksList);

//post method
router.post("/links" ,linkcontroller.addLink);

//stats for one code
router.get("/links/:code" , linkcontroller.singleLinks);

//delete Api by code 
router.delete("/links/:code",linkcontroller.deleteLink);

module.exports = router; 
