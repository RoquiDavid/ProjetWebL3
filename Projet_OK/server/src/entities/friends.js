class Friends {
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
  
    //Ajout d'un amis
    addFriends(targetId,Userid) {
        let _this = this
        return new Promise( (resolve, reject) =>{
            var stmt = _this.db.prepare("INSERT INTO friends VALUES (?,?);")               //Préparation de la requête
            stmt.run([Userid,targetId],function(err,res){
                if (err){
                    reject(err);
                }else{
                    resolve(this.lastID);
                }
            })
        })
    }

    //Permet l'affichage des amis
    showFriends(targetId,Userid) {
        let _this = this
        return new Promise( (resolve, reject) =>{
            var stmt = _this.db.prepare("SELECT * FROM friends WHERE user = ?;")               //Préparation de la requête
            stmt.run([Userid,targetId],function(err,res){
                if (err){
                    reject(err);
                }else{
                    resolve(this.lastID);
                }
            })
        })
    }


    //Suppression d'un amis
    deleteFriends(targetId,Userid) {
        let _this = this
        checkFriend (userId, targetId)
        return new Promise( (resolve, reject) =>{
            var stmt = _this.db.prepare("DELETE FROM friends WHERE user = ? AND follower = ?;")               //Préparation de la requête
            stmt.run([Userid,targetId],function(err,res){
                if (err){
                    reject(err);
                }else{
                    resolve(this.lastID);
                }
            })
        })
    }
    
  
    async checkFriend (userId, targetId){
        return new Promise((resolve,reject)=>{
            var stmt = db.prepare("SELECT *  FROM friends WHERE user = ? and follower = ?")    //Préparation de la requête
            stmt.get([userId, targetId],function(err,res){                                                   //Récupération et affecation des variables pour completer la rqt
                if (err){
                    reject(err);
                }else{
                    resolve(res.user_id);
                }
            })
        }) 
      }
}
  
  exports.default = Friends;
  
  