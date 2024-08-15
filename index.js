//Cod para uso framework
// Importación de módulos necesarios
const express = require('express'); //Routing
const axios = require('axios'); // HTTP requesst
const cors = require('cors');

const app = express(); //Iniciaización
const PORT = process.env.PORT || 3000;

app.use(cors()); // habilitando cors

//habilitando files staticos
app.use(express.static('public'));
// Definiendo un endpoint para buscar y mostrar data
app.get('/api/users', async (req, res) => {
    try {
        // buscando data de randomuser.me API (solo 10 usuarios)
        const response = await axios.get('https://randomuser.me/api/?results=10');
        const users = response.data.results;

        // Dando el formato requerido a la informacion con los fields requeridos
        const formattedUsers = users.map(user => ({
            gender: user.gender,
            name: `${user.name.first} ${user.name.last}`,
            location: `${user.location.city}, ${user.location.country}`,
            email: user.email,
            dob: user.dob.date,
            picture: user.picture.large
        }));

        // Enviando data formateada como JSON
        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error  buscando usuarios' });
    }
});

//Inicio servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
