/////////////////// INFORMATION GÉNÉRALE /////////////////
// on crée une db_user pour créer tous les rôle

///////////////////////// EXERCICE ///////////////////////
// ex 1 : Administrateur de db_mflix
// 1.1. Peux créer ou supprimer des collections ;
// 1.2. Peut créer, lire, mettre à jour et supprimer (CRUD) n’importe quels documents des 
// collections ;
// 1.3. Gérer les indexes pour toutes les collections ;
// 1.4. Gérer les rôles (et donc les utilisateurs) et leurs privilèges de cette base de données.

use("db_mflix");
db.createRole({
    role: "Administrateur_db_mflix",
    privileges: [],
    roles: [
        {
            role: "userAdmin",
            db: "db_mflix"   
        },
        {
            role: "readWrite",
            db: "db_mflix"   
        }
    ]
});

// ex 2 : Utilisateur
// 2.1. Lire les informations sur les films et les commentaires ;
// 2.2. Ajouter ou supprimer un ou des commentaires

use("db_mflix");
db.createRole({
    role: "Utilisateur",
    privileges: [
        {
            resource: {db: "db_mflix", collection: "movies"},
            actions: ["find"]
        },
        {
            resource: {db: "db_mflix", collection: "comments"},
            actions: ["find", "insert", "remove"]
        }
    ],
    roles: []
});

// ex 3 :  Gestionnaire 
// 3.1. Lire les informations sur tous les utilisateurs (pour savoir qui a fait un commentaire) ;
// 3.2. Mettre à jour, lire et supprimer des films ou des commentaires ;
// 3.3. Lire tous les commentaires.

use("db_mflix");
db.createRole({
    role: "Gestionnaire",
    privileges: [
        {
            resource: {db: "db_mflix", collection: "users"},
            actions: ["find"]
        },
        {
            resource: {db: "db_mflix", collection: "comments"},
            actions: ["find", "update", "remove"]
        },
        {
            resource: {db: "db_mflix", collection: "movies"},
            actions: ["find", "update", "remove"]
        },
    ],
    roles: []
});
 
////////////// EXPLICATION CREER UTILISATEUR /////////////
// voici 3 exemples de création d'utilisateurs

// Administrateur
use("db_mflix");
db.createUser({
    user: "John",
    pwd: "mflix",
    roles: [{role: "Administrateur_db_mflix", db:"db_mflix"}]
});

// Utilisateur
use("db_mflix");
db.createUser({
    user: "Bob",
    pwd: "mflix",
    roles: [{role: "Utilisateur", db:"db_mflix"}]
});

// Gestionnaire
use("db_mflix");
db.createUser({
    user: "Alice",
    pwd: "mflix",
    roles: [{role: "Gestionnaire", db:"db_mflix"}]
});

////// DÉTAILS COMMANDES //////
// user = au nom qu'on veut donner à l'utilisateur
// pwd = c'est le mot de passe (si la commande est faîtes sur console, on peut
// utiliser l'option passowrdPrompt pour cacher le mot de passe)
// roles = on peut donner plusieurs à un utilisateur, à chaque fois il faut indiquer 
// le rôle et la base de données
use("db_mflix");
db.getUsers();