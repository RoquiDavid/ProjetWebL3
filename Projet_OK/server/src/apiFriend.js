const express = require("express");
const Friends = require("./entities/friends.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const friend = new Friends.default(db);

    router
        .route("/friend/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            const friend_id = friend.showFriends(req.params.user_id);
            if (!user_id)
                res.sendStatus(404);
            else
                console.log(friend_id);
                res.send(friend_id);
        }
        catch (e) {
            res.status(400).send(e);
        }
    })

    router
    .post("/friend", (req, res) => {
        const { user_id, friends_id, pseudo} = req.body;
        if (!user_id || !friends_id || !pseudo) {
            res.status(400).send("Missing fields");
        } else {
            friend.addFriends(user_id, friends_id, pseudo)
                .then((user_id) => res.status(201).send({ id: req.params.friends_id }))
                .catch((err) => res.status(500).send(err));
        }
    });
    
    
    router
    .delete("/friend/", (req, res) => {
        const { user_id, friends_id} = req.body;
        if (!user_id || !friends_id) {
            res.status(400).send("Missing fields");
        } else {
            users.deleteFriends(user_id, friends_id)
                .then((user_id) => res.status(201).send({ id: friends_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    

    return router;
}
exports.default = init;

