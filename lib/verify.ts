"use server"
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';


export async function VerifyToken(token:any){
  
    const decoded = jwt.verify(token , "Abhinav")
        return decoded
}