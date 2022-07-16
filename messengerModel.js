import mongoose from "mongoose";

const messengerSchema=mongoose.Schema({
username:String,
message:String,
timestamp:String
})
export default mongoose.model('messages',messengerSchema)
