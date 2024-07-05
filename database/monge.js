const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URL;
let db;

const initDb = async (callback) => {
    if (db) {
        console.log('Database is already initialized');
        if (callback) callback(null, db);
        return db;
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        db = client.db('contacts'); 
        console.log('Connected to MongoDB');
        if (callback) callback(null, db);
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        if (callback) callback(err);
        throw new Error('Database connection failed');
    }
};

const getDatabase = () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
};

module.exports = {
    initDb,
    getDatabase,
};
