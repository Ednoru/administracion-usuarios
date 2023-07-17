import {pool} from '../registros.js';

//Funcion para listar todos los usuarios
export const getUsers = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } 
    catch (error) {
        return res.status(500).json({message: "Error al obtener los usuarios"});
    }
};

//Funcion para listar un usuario por id
export const getUserById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);

        if (rows.length <= 0)
            return res.status(404).json({message: "El usuario no existe"});

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({message: "Error al obtener el usuario"});
    }
};

//Funcion para crear un usuario
export const createUser = async (req, res) => {
    const {name, last_name, nickname ,email, password} = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO users(name, last_name, nickname, email, password) VALUES (?, ?, ?, ?, ?)', [name, last_name, nickname, email, password]);
        res.send({
            id: rows.insertId,
            name,
            last_name,
            nickname,
            email,
            password,
        });
    } catch (error) {
        return res.status(500).json({message: "Error al crear el usuario"});
    }
};

//Funcion para actualizar un usuario por id
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nickname } = req.body;

    try {
        const [result] = await pool.query(
          'UPDATE users SET nickname = IFNULL(?, nickname) WHERE user_id = ?', [nickname, id]);
    
        console.log(result);
    
        if (result.affectedRows <= 0) 
          return res.status(404).json({ message: "El usuario no existe" });
        
      
        const [row] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({message: "Error al actualizar el usuario"});
    }
};  

//Funcion para eliminar un usuario por id
export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);

        if(result.affectedRows <= 0)
            return res.status(404).json({message: "El usuario no existe"});
    
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: "Error al eliminar el usuario"});
    }
};