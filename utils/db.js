import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const db = process.env.DB_DATABASE || 'files_manager';
const fullURL = `mongodb://${host}:${port}/${db}`;
class DbCLient {
  constructor() {
    this.client = new MongoClient(fullURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = await this.client.db().collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    const files = await this.client.db().collection('files').countDocuments();
    return files;
  }
}

const dbClient = new DbCLient();
export default dbClient;
