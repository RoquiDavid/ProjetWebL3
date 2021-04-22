const express = require("express");
const Users = require("./entities/users.js");

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
    const users = new Users.default(db);
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            const user_id = users.get(req.params.user_id);
            if (!user_id)
                res.sendStatus(404);
            else
                console.log(user_id);
                res.send(user_id);
        }
        catch (e) {
            res.status(400).send(e);
        }
    })
        .delete((req, res, next) => {
            try {
                const user_id = users.deleteUser(req.params.user_id);
                if (!user_id)
                    res.sendStatus(404);
                else
                    console.log(user_id);
                    res.send(user_id);
            }
            catch (e) {
                res.status(400).send(e);
            }
        })

    router.put("/user/:user_id(\\d+)", (req, res) => {
        const { login, password, lastname, firstname, pseudo, birthday, age } = req.body;
        console.log(req);
        console.log(req.body);
        console.log(req.body.params);
        if (!login || !password || !lastname || !firstname || !pseudo || !birthday || !age) {
            res.status(400).send("Missing fields");
        } else {
            users.updateUser(req.params.user_id,login, password, lastname, firstname, pseudo, birthday, age)
                .then((user_id) => res.status(201).send({ id: req.params.user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    router.post("/user", (req, res) => {
        console.log("ok");
        const { login, password, lastname, firstname, pseudo, birthday, age } = req.body;
        if (!login || !password || !lastname || !firstname || !pseudo || !birthday || !age) {
            console.log("not ok", req.body.params);
            res.status(400).send("Missing fieldssss");
        } else {
            console.log("ok");
            users.createUser(login, password, lastname, firstname, pseudo, age, birthday)
                .then((user_id) => res.status(201).send({ id: req.params.user_id }))
                .catch((err) => res.status(50).send(err));
        }
    });

    return router;
}
exports.default = init;

