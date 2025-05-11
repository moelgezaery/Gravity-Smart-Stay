import { DataSource } from 'typeorm';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();


export default new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || '192.168.1.47',
  port: Number(process.env.DB_PORT) || 1433,
  username: process.env.DB_USER|| 'sa',
  password: process.env.DB_PASSWORD||'123@123qw',
  database: 'ITISAL',
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, 'dist/**/*.entity.js')],
  migrations: [path.join(__dirname, 'src/migrations/*.js')],
  migrationsTableName: 'migrations',

  extra: {
    trustServerCertificate: true // For local dev
  }
});
