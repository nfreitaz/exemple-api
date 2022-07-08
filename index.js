import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    { id: 1, name: 'Antonio Xavier', age: 31 },
    { id: 2, name: 'Maria del Bairro', age: 33 },
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express.</h1>');
});


app.get('/users', (resquest, response) => {
    return response.send(users);//todos usuarios
});

app.get('/users/:usersId', (request, response) => {
    const userId = request.params.usersId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
});

app.post('/users', (resquest, response) => {
    const newUser = resquest.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (request, reposnse) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    });

    return reposnse.send(updatedUser);
});

app.delete('/users/:userId', (request, response) =>{
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});