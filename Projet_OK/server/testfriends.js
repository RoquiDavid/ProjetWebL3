const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/apiFriend.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');



// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API friend", () => {
    mocha.it("friend", (done) => {
        const request = chai.request(app.default).keepOpen();
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
                    
                    //On ajoute un amis
                    request
                        .post(`/api/friend`)
                        .send(res.body.id,2)
                        .then((res) => {
                            res.should.have.status(201)
                        }),
                    //On affiche un amis
                    request
                        .get(`/api/friend/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                        }),
                    //On affiche les amis après suppression un amis
                    request
                        .delete(`/api/friend/${res.body.id}/2`)
                        .then((res) => {
                            res.should.have.status(200)
                        }),
                    //On regarde si l'utilisateur est bien supprimé
                    //On affiche un amis
                    request
                        .get(`/api/friend/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                        })
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
    })
})

