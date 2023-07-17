import {Router} from 'express';
import { createUser, getUsers, updateUser, deleteUser, getUserById } from '../controllers/users.controllers.js';

const router = Router();

router.get('/users', getUsers) //Lista completa de usuarios

router.get('/users/:id', getUserById) //Lista un usuario por id

router.post('/users', createUser)

router.patch('/users/:id', updateUser) //Actualiza un usuario por id
                                       //put es para actualizar todos los campos y patch para actualizar solo algunos
 
router.delete('/users/:id', deleteUser)

export default router;