const userModel=require("../models/userModel")
const Task=require("../models/taskModel")

const taskUpdated= async(req, res)=>{
    const {title, description, completed, priority,status, category}=req.body
    const{email}=req.body
    try{
        const user= await userModel.findOne({email:email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(user.role!=="user"){
            return res.status(403).json({message:"Only user can update the task"})
        }
        const existingTask=await Task.findOne({title:title})
        if(!existingTask){
            return res.status(404).json({message:"Task not founds"}); 
        }
        const updateResult=await Task.updateOne(
            {title},{$set:{description, category, completed, priority, status }}
        );
        if(updateResult.modifiedCount>0){
            console.log("task upadated successfully")
            return res.status(200).json({message:"Task updated successfully",updateResult})
        }
        else{
            res.status(400).json({message:"No changes were to task details"})
            console.log("No changes task details")
        }
    }catch(err){
        console.log("Error upadating the task")
        res.status(500).json({message:"Error updating the task", error:err.message})
    }
}
module.exports={taskUpdated}