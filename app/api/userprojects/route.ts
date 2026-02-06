import { AddProjectInDB } from "@/db/addproject"
import { pool } from "@/db/connection"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const data = await pool.query(`
            Select screenshots_url , project_name , votes , id ,problem_stat , soln, badges ,live_url , techstack, challenges, future_implementations from projects
            where username='alice123'
            `)
        return new Response(JSON.stringify(data.rows), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function POST(req: Request) {
    try {
        // console.log(await req.json())
        const { title, oneLiner, description, screenshots } = await req.json()
        await AddProjectInDB({ title: title, oneline: oneLiner, desc: description, screenshot: screenshots, techStack: "n8n" })
        return NextResponse.json({"ok":true})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({"ok":false})
    }
     
}