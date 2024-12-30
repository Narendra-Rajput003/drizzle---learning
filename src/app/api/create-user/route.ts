

import {signUpSchema} from "@/lib/validator/userSchema"
import {db} from "@/lib/db/db";
import {users} from "@/lib/db/schema";
import bcrypt from "bcrypt"
async function POST(req:Request){
      const body=await  req.json();

      let validatedData;
   try{
       validatedData =  signUpSchema.parse(body);

       if(!validatedData){
           return  Response.json({
               message:"Data not found"
           })
       }

       await  db.insert(users).values(validatedData);

       return Response.json({message:'Ok'},{status:201})

   }catch (e){
       console.log(e)
    return new Response(JSON.stringify({message: "error"}), {status: 500})
   }
}