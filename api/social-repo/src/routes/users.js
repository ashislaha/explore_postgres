// Route:
// 1. /users <-- get all the users from the db
// 2. /users/:id <-- fetch a particular user with ID
// 3. /users POST -- create a new user
// 4. /users/:id PUT -- update a user data
// 5. /users/:id Delete -- delete a user with ID

const express = require('express');
const userRepo = require('../repos/user-repo');
const UserRepo = require('../repos/user-repo');

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await UserRepo.find();
    res.send(users);
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await UserRepo.findById(id);
    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/users', async (req, res) => {
    const {username, bio} = req.body;
    const user = await UserRepo.insert(username, bio);
    if (user) {
        res.send(user);
    } else {
        res.sendStatus(500);
    } 
});

router.put('/users/:id', async (req, res) => {
    console.log(req.body);

    const {id} = req.params;
    const {username, bio} = req.body;
    const user = await UserRepo.update(id, username, bio);
    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    const user = await UserRepo.delete(id);
    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;