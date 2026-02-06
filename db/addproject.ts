import { title } from "process";
import { pool } from "./connection";
import { getUser } from "@/lib/getuser";

interface Props {
    title: string;
    desc: string;
    oneline: string;
    techStack: string;
    screenshot: string[];
}

export async function AddProjectInDB(info: Props) {
    try {
        const data = await getUser()
        await pool.query(`
        insert into projects (title , soln , category , screenshots_url , votes , username)
        values ($1 , $2 , $3 , $4 , 1 , $5)`, [info.title, info.oneline, info.techStack, info.screenshot , data.email])
    }
    catch (err) {
        console.log(err)
    }
}