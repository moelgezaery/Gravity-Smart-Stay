import { asyncHandler } from '../../../utils/errorHandling.js';
import {  createClientConnection, connectToDatabase, connectToMasterDB } from '../../../../DB/connection.js';
import {  findClientIdByEmail, findConnectionInfoByClientId } from '../../../../DB/quires.js';

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    await connectToMasterDB();
  
    const clientId = await findClientIdByEmail(email, password);
    const connInfo = await findConnectionInfoByClientId(clientId);
    
    if (!connInfo?.ACTIVE_USERS) {
      console.error("ACTIVE_USERS not found in connInfo:", connInfo);
      return res.status(500).json({ message: 'Server configuration error' });
    }
  
    const clientDB = await createClientConnection(connInfo);
    const databaseName = clientDB.config.database;
  
    // Set cookies
    res.cookie("clientId", clientId, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 86400000, // 1 day
    });
  
    res.cookie('activeUsers', connInfo.ACTIVE_USERS, {
      httpOnly: false,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000, // 1 day
      path: '/',
    });
  
    console.log("ACTIVE_USERS set:", connInfo.ACTIVE_USERS);
  
    res.json({
      message: "success",
      databaseName,
      clientId,
      activeUsers: connInfo.ACTIVE_USERS, // Return in response for debugging
    });
  
    await connectToDatabase(databaseName);
  });