import express from 'express';
import { MongoClient, Db } from 'mongodb';

const DATABASE_NAME = 'leeg';
let _dbInstance: Db;

const connectToDatabase = async () => {
  return await new Promise<Db>((resolve, reject) => {
    const host = process.env.MONGO_HOST || 'mongodb://mongo:27017';
    const client = new MongoClient(
      host,
      // { useUnifiedTopology: true }
    );

    client.connect((error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Connected to database "${DATABASE_NAME}" at ${host}`);
        resolve(client.db(DATABASE_NAME));
      }
    });
  });
};

const initialize = async () => {
  _dbInstance = await connectToDatabase();
};

const instance = () => {
  if (!_dbInstance) {
    throw new Error('Not connected to database');
  }

  return _dbInstance;
};

const database = { initialize, instance };
export default database;
