import { asyncHandler } from "../../../utils/errorHandling.js";
import { masterDB, itisalDB } from "../../../../DB/connection.js"; // Import connection pools

export const health = asyncHandler(async (req, res, next) => {
    try {
        // Check if the connection to either the master or itisal DB is established
        const masterConnected = await masterDB.connect();  // Check if Master DB is connected
        const itisalConnected = await itisalDB.connect();  // Check if ITISAL DB is connected

        res.json({
            status: "ok",
            timestamp: new Date(),
            dbStatus: {
                masterDB: masterConnected ? "connected" : "disconnected",
                itisalDB: itisalConnected ? "connected" : "disconnected",
            }
        });
    } catch (error) {
        res.json({
            status: "ok",
            timestamp: new Date(),
            dbStatus: {
                masterDB: "disconnected",
                itisalDB: "disconnected",
            }
        });
    }
});
