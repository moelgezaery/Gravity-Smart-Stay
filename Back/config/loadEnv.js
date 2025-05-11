import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust the path to where your .env really is
const envPath = path.join(__dirname, './.env');
dotenv.config({ path: envPath });


