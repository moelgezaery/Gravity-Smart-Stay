import sql from 'mssql';

// Base configuration that can be extended for different databases
const baseDBConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        connectTimeout: 30000,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 30000,
    },
};

// Retry configuration
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Master DB configuration
const masterDBConfig = {
    ...baseDBConfig,
    database: process.env.MASTER_DB_NAME,
};

// Itisal DB configuration
const itisalDBConfig = {
    ...baseDBConfig,
    database: process.env.ITISAL_DB_NAME,
};

// Master DB connection pool
const masterDB = new sql.ConnectionPool(masterDBConfig);

// Itisal DB connection pool
const itisalDB = new sql.ConnectionPool(itisalDBConfig);

// Connect with retry logic
const connectWithRetry = async (pool, dbName, retries = MAX_RETRIES) => {
    for (let i = 0; i < retries; i++) {
        try {
            await pool.connect();
            console.log(`✅ Connected to ${dbName} DB`);
            return pool;
        } catch (error) {
            console.log(`❌ Attempt ${i + 1}/${retries} to connect to ${dbName} failed: ${error.message}`);
            if (i === retries - 1) {
                throw new Error(`❌ Unable to connect to the ${dbName} Database after ${retries} attempts: ${error.message}`);
            }
            await wait(RETRY_DELAY);
        }
    }
};

// Connect to master DB
const connectToMasterDB = async () => {
    return connectWithRetry(masterDB, 'Master');
};

// Connect to Itisal DB
const connectToItisalDB = async () => {
    return connectWithRetry(itisalDB, 'ITISAL');
};

// Function to connect to any other database dynamically
const connectToDatabase = async (databaseName) => {
    const customDBConfig = { ...baseDBConfig, database: databaseName };
    const dbConnection = new sql.ConnectionPool(customDBConfig);
    return connectWithRetry(dbConnection, databaseName);
};

// Function to create a client-specific database connection
const createClientConnection = async (connInfo) => {
    const clientDBConfig = {
        user: connInfo.SQL_USER,
        password: connInfo.SQL_USR_PASS,
        server: connInfo.SQL_SRV_IP.trim(),
        database: connInfo.SQL_DB_NAME,
        options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
            connectTimeout: 30000,
        }
    };

    const clientDB = new sql.ConnectionPool(clientDBConfig);
    return connectWithRetry(clientDB, connInfo.SQL_DB_NAME);
};

// Export all the connection functions and pools
export {
    masterDB,
    itisalDB,
    connectToMasterDB,
    connectToItisalDB,
    connectToDatabase,
    createClientConnection
};
