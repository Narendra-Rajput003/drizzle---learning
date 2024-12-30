
import { z } from "zod"



export const signUpSchema=z.object({
    firstname:z.string().min(3,{message:"FirstName should be 3 character long"}),
    lastname:z.string().min(3, {message:"LastName should be 3 character long"}),
    email:z.string().email({message:"Invalid Email"}),
    age:z.number().min(18,{message:"Age should be greater than 18"}).max(100,{message:"Age should be less than 100"}),
    password:z.string().min(8,{message:"Password should be 8 character long"}),
    role:z.enum(["user","customer","admin"]).default("user")
})


export const loginSchema=z.object({
    email:z.string().email({message:"Invalid Email"}),
    password:z.string().min(8, {message:"Password should be 8 character long"})
})

export const bookSchema=z.object({
    name:z.string().min(3, {message:"Name should be 3 character long"}),
    authorId:z.number().min(1, {message:"AuthorId should be greater than 0"})
})