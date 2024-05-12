import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;


const clients = [
    { id: 1, username: "Alfredo", displayname: "Freddy" },
    { id: 2, username: "Telmo", displayname: "Yuzuro" },
    { id: 3, username: "Benio", displayname: "Bento" },
    { id: 4, username: "George", displayname: "Georgie" },
];

/**list the clients with method get */

app.get("/", (request, response) => {
    response.status(200);
    response.send({ msg: "User Authorized"});
});

app.get("/api/users", (request, response) => {
   response.send(clients)
});


app.listen(PORT, () => {

    console.log(`Server Running on http://localhost:${PORT}`)
});