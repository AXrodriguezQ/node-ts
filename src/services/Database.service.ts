// ? External Dependencies
import * as mongoDB from 'mongodb';

// ? Global Variables
export const collections: { games?: mongoDB.Collection } = {};

// ? Initialize Connection
export async function connectToDatabase () {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb://localhost:27017/');

    await client.connect();

    const db: mongoDB.Db = client.db('gamesDB');

    const gamesCollection: mongoDB.Collection = db.collection('games');

    collections.games = gamesCollection;

    console.log('Connected to games collection');

}