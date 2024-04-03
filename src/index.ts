import express from 'express';
import { connectToDatabase } from './services/Database.service';
import { gamesRoutes } from './routes/games.routes';

const app = express()

const PORT = 3000

connectToDatabase()
    .then(() => {
        app.use('/games', gamesRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    })
    .catch((err) => {
        console.log(err);
        process.exit();
    })
