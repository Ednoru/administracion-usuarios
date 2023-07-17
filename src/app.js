import express from 'express';
import registosUsers from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use('/api',registosUsers);

app.use((req, res, next) => {
    res.status(404).json({message: "Ruta no encontrada"});
});

export default app;