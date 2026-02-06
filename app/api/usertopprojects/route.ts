import { pool } from "@/db/connection";

export async function GET() {
    try {
        const result = await pool.query(
            `SELECT title , votes, screenshots_url FROM projects limit 2`
        );

        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (err) {
        console.error('DB error:', err);
        return new Response('Internal Server Error', { status: 500 });
    }
}