import { asyncHandler } from "../../../utils/errorHandling.js";
import { masterDB, itisalDB } from "../../../../DB/connection.js"; // Import your connection pools
import sql from 'mssql'; // Add this import

export const query = asyncHandler(async (req, res, next) => {
    try {
        const { query, params, dbType } = req.body; // Assume dbType is passed to choose between masterDB or itisalDB
        console.log("Executing query:", query);
        console.log("With parameters:", params);

        // Determine which database pool to use (masterDB or itisalDB)
        const pool = dbType === 'master' ? masterDB : itisalDB;

        // Ensure the connection is established before executing the query
        await pool.connect();  // Connect to the selected DB

        const request = pool.request();

        // Bind parameters to the request if provided
        if (params && Array.isArray(params)) {
            params.forEach((param, index) => {
                request.input(`param${index + 1}`, param);
            });
        }

        // Execute the query
        const result = await request.query(query);
        console.log("Query result:", result.recordset);

        // Send the result back to the client
        res.json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: error.message,
            code: error.code,
            originalError: error.originalError?.message,
        });
    }
});

export const queryMaster = asyncHandler(async (req, res, next) => {
    try {
        const { query, params } = req.body;
        console.log('🚀 Executing query:', query);
        console.log('🧩 With parameters:', params);

        const pool = masterDB;
        await pool.connect();

        const request = pool.request();

        // Define types for known query patterns
        const inferredTypes = query.includes('INSERT INTO USERS') ? [
            sql.NVarChar,     // UserName
            sql.NVarChar,     // Password
            sql.UniqueIdentifier,  // CLIENT_ID
            sql.NVarChar,     // Mobile
            sql.NVarChar,     // POSMachines
            sql.NVarChar      // Email
        ] : [];

        if (params && Array.isArray(params)) {
            params.forEach((param, index) => {
                const type = inferredTypes[index] || sql.NVarChar;
                request.input(`param${index + 1}`, type, param);
            });
        }

        const result = await request.query(query);
        console.log('✅ Query result:', result.recordset);

        res.json(result.recordset);
    } catch (error) {
        console.error('❌ Database error:', {
            message: error.message,
            code: error.code,
            original: error.originalError?.message || '',
        });

        res.status(500).json({
            error: error.message,
            code: error.code || 'UNKNOWN',
            originalError: error.originalError?.message || '',
            stack: error.stack,
        });
    }
});