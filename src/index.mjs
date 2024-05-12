import express, { request } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

/**Middlewares */

app.use(express.json());



/** experimental Data */

const clients = [
    { id: 1, username: "Alfredo", displayname: "Freddy" },
    { id: 2, username: "Telmo", displayname: "Yuzuro" },
    { id: 3, username: "Marina", displayname: "Marino" },
    { id: 4, username: "George", displayname: "Georgie" },
];

/**list the clients with method get */


app.get("/", (request, response) => {

    response.status(200);
    response.send({ msg: "User Authorized" });

});

/**Query Parameters */
// How to use
// http://localhost:3000/api/user?key=value&key2=value2
// example: http://localhost:3000/api/user?filter=username&value=a

app.get("/api/users", (request, response) => {

    console.log(request.query);

    const { query: { filter, value }, } = request;

    if (!filter && !value) return response.send(clients);

    if (filter && value) return response.send(
        clients.filter((user) => user[filter].includes(value))
    );

});




/**Route parameters */

app.get("/api/users/:id", (request, response) => {

    console.log(request.params);

    const parsedId = parseInt(request.params.id);

    if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad Request, Invalid ID" });

    const findUser = clients.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);

    return response.send(findUser);

});



/**POST METHODS */
// Create Data

app.post("/api/users", (request, response) => {

    const { body } = request;

    const newUser = { id: clients[clients.length - 1].id + 1, ...body };

    clients.push(newUser);
    return response.sendStatus(201).send(newUser);

});

/**UPDATE METHODS */
// Put Method

app.put("/api/users/:id", (request, response) => {

    const { body, params: { id }, } = request;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = clients.findIndex(
        (user) => user.id === parsedId
    )

    if (findUserIndex === -1) return response.sendStatus(404);

    clients[findUserIndex] = { id: parsedId, ...body };
    return response.sendStatus(200);
});

/**Method PATCH */

app.patch("/api/users/:id", (request, response) => {

    const { body, params: { id }, } = request;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = clients.findIndex(
        (user) => user.id === parsedId
    );

    if (findUserIndex === -1)
        return response.sendStatus(404);

    clients[findUserIndex] = { ...clients[findUserIndex], ...body };
    return response.sendStatus(200);

});


/**DELETE method */


app.delete("/api/users/:id", (request, response) => {

    const { body, params: { id }, } = request;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = clients.findIndex(
        (user) => user.id === parsedId
    );

    if (findUserIndex === -1)
        return response.sendStatus(404);

    clients.splice(findUserIndex);
    return response.sendStatus(200);

});





app.listen(PORT, () => {

    console.log(`Server Running on http://localhost:${PORT}`)
});