import mysql from "mysql2/promise"

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "travel_agency",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export async function getConnection() {
  try {
    return await pool.getConnection()
  } catch (error) {
    console.error("Database connection error:", error)
    throw error
  }
}

export default pool
