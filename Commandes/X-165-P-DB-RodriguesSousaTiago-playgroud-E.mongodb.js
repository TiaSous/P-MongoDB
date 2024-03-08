// ex 1
// Recherche des films contenant le mot-clé « matrix »
use("db_mflix");
db.movies.find({ $text: { $search: "matrix" } });

// ex 2
// Recherche tous les films contenant la phase « best movie ever »
// TODO ne le trouve pas collé
use("db_mflix");
db.movies.find({ $text: { $search: "\"best movie ever\"" } });

// ex 3
// Recherche des films contenant le terme « war », 
// tout en excluant ceux contenant le terme « world »
use("db_mflix");
db.movies.find({ $text: { $search: "war -world", $caseSensitive: false } });

// ex 4
// Trouver des films où la description contient « space » mais pas « mars »
use("db_mflix");
db.movies.find({ $text: { $search: "space -mars" } }, { _id: 0, title: 1, fullplot: 1 });

// ex 5
// Trouver des films avec le mot exact « time travel » dans la description
use("db_mflix");
db.movies.find({ $text: { $search: "\"time travel\"" } }, { _id: 0, title: 1, fullplot: 1 });

// ex 6
// Rechercher des films avec des mots commençant par « inter » dans le titre
use("db_mflix");
db.movies.find({ title: { $regex: /\binter/i } }, { _id: 0, title: 1 })


use("db_mflix");
db.movies.find({ $text: { $search: "\"best movie ever\"" } }).explain("executionStats")

use("db_mflix");
db.movies.createIndex(
    {
        "title": "text",
        "fullplot": "text"
    }
);

