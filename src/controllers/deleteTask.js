const userModel=require("../models/userModel")
const Task=require("../models/taskModel")
const deleteTask=async(req,res)=>{
    const{email,title}=req.body;
    try{
        const user=await userModel.findOne({email:email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(user.role!=="user"){
            return res.status(404).json({message:"only user can delete the task"})
        }
        const existingTask=await Task.findOneAndDelete({title:title})
        if(!existingTask){
            return res.status({message:"Task not found in this title"})
        }
        res.status(200).json({message:"Task deleted successfully", existingTask})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}
module.exports={deleteTask}