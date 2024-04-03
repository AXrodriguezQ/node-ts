// ? External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/Database.service";
import Game from "../models/game";

// ? Global Config
export const gamesRoutes = express.Router();

gamesRoutes.use(express.json());

// ? GET

gamesRoutes.get('/', async ( _req: Request, res: Response ) => {
    try {
        const games = await collections.games?.find({}).toArray() ;
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

gamesRoutes.get('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const game = await collections.games?.findOne(query);

        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).send('Game not found');
        }

    } catch (error) {
        res.status(500).send(error);
    }
});

// ? POST
gamesRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const newGame = req.body;
        const result = await collections.games?.insertOne(newGame);

        result
            ? res.status(200).send('Game added successfully')
            : res.status(500).send('Failed to add game')

    } catch (error) {
        res.status(500).send(error);
    }
});

// ? PUT
gamesRoutes.put('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updateGame: Game = req.body as Game;
        const query = { _id: new ObjectId(id) };

        const result = await collections.games?.updateOne(query, { $set: updateGame });

        result
            ? res.status(200).send('Game updated successfully')
            : res.status(304).send('Failed to update game')

    } catch (error) {
        res.status(500).send(error);
    }

});

// ? DELETE
gamesRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.games?.deleteOne(query);

        if ( result && result.deletedCount ) {
            res.status(200).send('Game deleted successfully');
        } else if ( !result ) {
            res.status(400).send('Failed to delete game');
        } else if ( !result.deletedCount ) {
            res.status(404).send('Game not exist');
        }

    } catch (error) {
        res.status(500).send(error);
    }

});