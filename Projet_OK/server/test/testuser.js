const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');



// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API user", () => {
    mocha.it("user", (done) => {
        const request = chai.request(app.default).keepOpen();
        /*req1 = 'SELECT login, password, lastname, firstname, pseudo, birthday, age FROM users WHERE rowid = 1;';
        // get pour un seul
        db.all(req1, [], (err, rows) => {
            if (err) {
                throw err ;
            }
            rows.forEach((row) => {
                console.log(row.name);
            });
            user = rows.login
        });*/

        const user = {
            login: "pikachu",
            password: "1234",
            firstname: "pika",
            lastname: "chu",
            pseudo: "pkm91",
            birthday: "28/05",
            age: "25"

        };

        const user2 = {
            login: "pikachuuuuuuuuuuu",
            password: "1234",
            firstname: "pika",
            lastname: "chu",
            pseudo: "pkm91",
            birthday: "28/05",
            age: "25"

        };
        
        request
            .post('/api/user')
            .send(user)

            .then((res) => {
                res.should.have.status(201);
                console.log(`Retrieving user ${res.body.id}`)
                return Promise.all([
                    //Requête pour récuperer les info user
                    request
                        .get(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, user)
                        }),

                    request
                        .get(`/api/user/4`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),
                    //On met à jour l'utilisateur
                    request
                        .put(`/api/user/1`)
                        .send(user2)
                        .then((res) => {
                            res.should.have.status(200)
                        }),
                    //Requête de suppression d'user
                    request
                        .delete(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                        }),
                    //On regarde si l'utilisateur est bien supprimé
                    request
                    .get(`/api/user/${res.body.id}`)
                    .then((res) => {
                        res.should.have.status(404)
                    })
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
    })
})

