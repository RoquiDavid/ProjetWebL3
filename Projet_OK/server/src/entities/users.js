class Users {
  constructor(db) {
    this.db = db
    var cpt=0
    const createUserTab= `CREATE TABLE IF NOT EXISTS users(
    login VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    pseudo VARCHAR(50) NOT NULL,
    age VARCHAR(50) NOT NULL,
    birthday VARCHAR(50) NOT NULL
    )`;
    const createFriend=`CREATE TABLE IF NOT EXISTS frienduser(
    follower VARCHAR(50) NOT NULL,
    user VARCHAR(50) NOT NULL,
    date VARCHAR(50) NOT NULL,
    PRIMARY KEY (follower, user),
    FOREIGN KEY(follower) REFERENCES users(login),
    FOREIGN KEY(user) REFERENCES users(login)
    )`;

    this.db.exec(createUserTab, function(err){
      if(err)
        throw err;

      console.log('User table ready')
    })

     this.db.exec(createFriend, function(err){
      if(err)
        throw err;

      console.log('frienduser table ready')
    })
  }

  //Création de l'utilisateur
  createUser(login, password, lastname, firstname, pseudo, birthday, age){
    let _this = this
    console.log('Inscription faites pour:');
    return new Promise( (resolve, reject) =>{
        var stmt = _this.db.prepare("INSERT INTO users VALUES (?,?,?,?,?,?,?);")               //Préparation de la requête
        stmt.run([login,password,lastname,firstname,pseudo,age,birthday],function(err,res){
            if (err){
                console.log('erreur lors de la création')
                reject(err);
            }else{
                console.log('Inscription faites pour: ', login)
                resolve(this.lastID);
            }
        })
    })
  }

  //Suppression de l'utilisateur
  deleteUser(userid){
    let _this = this
    return new Promise( (resolve, reject) =>{
        var stmt = _this.db.prepare("DELETE FROM users WHERE rowid = ?")               //Préparation de la requête
        stmt.run([userid],function(err,res){
            if (err){
              console.log("erreur lors de la suppression de ",userid)
              reject(err);
            }else{
              console.log("suppression reussie de ",userid)
               resolve(this.lastID);
            }
        })
    })
  }

  //Mise à jour de l'utilisateur
  updateUser(userid,login,password,lastname,firstname,pseudo,age,birthday){
    let _this = this
    return new Promise( (resolve, reject) =>{
        var stmt = _this.db.prepare("UPDATE users SET login = ?, password = ?, lastname = ?, firstname = ?, pseudo = ?, age = ?, birthday = ? WHERE rowid = ?")               //Préparation de la requête
        stmt.run([login,password,lastname,firstname,pseudo,age,birthday,userid],function(err,res){
            if (err){
              console.log("erreur lors de la mise à jour de ",userid)
              reject(err);
            }else{
              console.log("Mise à jour réussie de ",userid)
              resolve(this.lastID);
            }
        })
    })
  }


  //Selection d'un utilisateur via son id
  get(userid){
    let _this = this
    return new Promise((resolve,reject)=>{
        var stmt = _this.db.prepare("SELECT * FROM users WHERE rowid = ?")     //Préparation de la requête          
        stmt.get([userid],function(err,res){                             //Récupération et affecation des variables pour completer la rqt
            if (err){
                reject(err);
            }else{
                console.log(res);
                resolve(res);
            }
        })
    })
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      if(false) {
        //erreur
        reject();
      } else {
        resolve(true);
      }
    });
  }

  async checkpassword (login, password){
    return new Promise((resolve,reject)=>{
        var stmt = db.prepare("SELECT rowid as user_id FROM users WHERE login = ? and password = ?")    //Préparation de la requête
        stmt.get([login, password],function(err,res){                                                   //Récupération et affecation des variables pour completer la rqt
            if (err){
                reject(err);
            }else{
                resolve(res.user_id);
            }
        })
    }) 
  }
}

exports.default = Users;

