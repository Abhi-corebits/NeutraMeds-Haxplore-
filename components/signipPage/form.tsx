'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState , useTransition } from "react"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { Verify } from "./verification"

export default function SignupForm() {
    const [showPass , setShowPass] = useState(false)
    const [filled , setFilled] = useState('')
    const [pass , setPass] =useState("")
    const [name , setname] = useState("")
    const [isvalid , setIsvalid] = useState(true)
    const [validmsg , setValidmsg] = useState("")
    const [isPending , startTransition] = useTransition()

    function Handelvalue(e:any){
        setFilled(e.target.value)
    }

    function Handelname(e: any) {
        setname(e.target.value)
    }

    function Handelpass(e: any) {
        setPass(e.target.value)
    }

    async function HandelonSubmit(e:any){
        e.preventDefault()
        // console.log(e.target) //React returns jsx instead of value
        setIsvalid(true)
        const formData = new FormData(e.target)
        const email = formData.get("email")?.toString() ?? ""
        const name = formData.get("name")?.toString() ?? ""
        const pass = formData.get("password")?.toString() ?? "" //fetchs from name and converts to string from formfiledata
        startTransition(async () => {
            const validObj = await Verify(email,pass,name)
            setIsvalid(validObj.valid)
            setValidmsg(validObj.msg)
        })
    }

    return (
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-10">
            <form onSubmit={HandelonSubmit}>
                <div className="w-full max-w-lg space-y-3 ">
                <h1 className="text-4xl font-semibold font-sm text-center -translate-y-2">Create Your Account</h1>
                <p className="text-sm font-medium text-gray-300 pb-4">Already member of our community? <span className="font-bold text-center items-center text-gray-100"><Link href={'/login'} className="hover:underline">Login here.</Link> </span></p>
                <div className="space-y-5 pt-1">
                        {/* Name */}
                        <div className="space-y-2 relative">
                            <Label htmlFor="password" className="text-lg">Name</Label>
                            <Input
                                name="name"
                                type="text"
                                placeholder="Bob"
                                style={{
                                    background: name.length ? 'white' : "transparent",
                                    color: name.length ? 'black' : "transparent"
                                }}
                                onChange={Handelname}
                            />
                        </div>
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-lg">Email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            style={{
                                background: filled.length ? 'white' : "transparent"  ,
                                color: filled.length ? 'black' : "transparent"
                            }}
                            onChange={Handelvalue}  
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2 relative">
                        <Label htmlFor="password" className="text-lg">Password</Label>
                        <div className="relative">
                            <Input
                                name="password"
                                type={showPass ? "text" : "password"}
                                placeholder="••••••••"
                                style={{
                                    background: pass.length ? 'white' : "transparent",
                                    color: pass.length ? 'black' : "transparent"
                                }}
                                onChange={Handelpass}
                            />
                            <button onClick={()=> setShowPass(!showPass)} type="button" className="absolute right-2.5 top-1.5">
                                {
                                    showPass ? <EyeClosedIcon className={pass.length ? "text-black" : "text-white"} /> : <EyeIcon className={pass.length ? "text-black" : "text-white"} />
                                }
                            </button>
                        </div>
                    </div>
                    <div className="pb-2"> 
                    {
                        !isvalid && <p className=" text-red-500 text-sm font-medium "> {validmsg} </p>
                    }
                    
                    {
                        isPending && <p className="text-white/30 animate-pulse">Processing....</p>
                        
                    }   
                    </div>
                </div>
                <Button className="w-full border" variant={"ghost"} type="submit" >Sign in</Button>
            </div>
            </form>
        </div>
    )
}

