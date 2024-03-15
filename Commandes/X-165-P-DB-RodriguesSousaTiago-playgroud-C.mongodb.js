// ex 1 
// Lister tous les films d'action
use("db_mflix");
db.movies.find({genres: "Action"});

// ex 2
// Lister tous les films sortis après l'an 2000
use("db_mflix");
db.movies.find({released : {$gte : new Date(2000, 1, 1)}});

// ex 3 
// Lister tous les films réalisés après 2010 mais avnt 2020
use("db_mflix");
db.movies.find({year : {$gt: 2010, $lt : 2020}});

// ex 4
// Lister tous les films sortis dans les années 2000 mais ayant un style des années 1980
use("db_mflix");
db.movies.find({released : {$gte : new Date(2000, 1, 1), $lt : new Date(2010, 1, 1)}, plot: { $regex: /1980/ }}).count();

// ex 5
// Lister tous les films réalisés par Quentin Tarantino
use("db_mflix");
db.movies.find({directors: "Quentin Tarantino"});

// ex 6
// Lister tous les films de la série Star Wars
use("db_mflix");
db.movies.find({title: {$regex: /Star Wars/}});

// ex 7
// Lister tous les films avec un score « IMDb » supérieur à 8
use("db_mflix");
db.movies.find({"imdb.rating": {$gt: 8}});

// ex 8
// Lister tous les films qui ne sont pas de genre « Horror » ou « Sci-Fi »
use("db_mflix");
db.movies.find(
    {$nor: [
        {genres: "Horror"},
        {genres: "Sci-Fi"}
    ]}
)

// ex 9
// Lister tous les films ayant exactement 3 différents genres
use("db_mflix");
db.movies.find({genres:{$size: 3} });

// ex 10 
// Lister tous les films dont le dernier genre est « Drama »
use("db_mflix");
db.movies.find({$expr :{$eq: [{$arrayElemAt: ["$genres", -1]}, "Drama"]}});

// ex 11
// Lister tous les films qui durent entre 1h30 et 2h
use("db_mflix");
db.movies.find({runtime: {$gte: 90, $lte: 120}});

// ex 12
// Lister tous les films avec plus de 100 commentaires
use("db_mflix");
db.movies.find({num_mflix_comments: {$gt: 100}});

// ex 13
// Lister tous les films qui ne sont pas classés « R »
use("db_mflix");
db.movies.find({rated: {$not: {$eq :"R"}}});

// ex 14
// Lister tous les films dont le titre commence par « The »
use("db_mflix");
db.movies.find({title: {$regex: /^The/}});

// ex 15
// Lister tous les films ayant reçu un certain nombre d’awards
use("db_mflix");
db.movies.find({"awards.wins": {$gte: 1}});

// ex 16
// Lister tous les films où le réalisateur et le premier acteur sont les mêmes
use("db_mflix");
db.movies.find({$expr: {
    $eq:[{$arrayElemAt: ["$directors", 0]}, {$arrayElemAt: ["$cast", 0]}]
}});

// ex 17
// Lister tous les films dans lesquels « Brad Pitt » et « Angelina Jolie » sont acteurs
use("db_mflix");
db.movies.find({$and: [{"cast": "Brad Pitt"}, {"cast": "Angelina Jolie"}]});

// ex 18
// Lister tous les films  dans lesquels « Brad Pitt » est acteur et 
// dont le nombre de commentaires est au moins égal à 100
use("db_mflix");
db.movies.find({$and: [{"cast": "Brad Pitt"}, {num_mflix_comments: {$gte: 100}}]});

// ex 19
// Lister tous les films où l’acteur principal est une « femme »
use("db_mflix");
db.movies.find({cast: {$regex: /^Mrs\./}});

// ex 20
// Lister tous les films  où « Tom Hanks » est acteur, mais pas « réalisateur »
use("db_mflix");
db.movies.find({cast: "Tom Hanks", directors: {$ne: "Tom Hanks"}});

// ex 21
// Lister tous les films  mais doivent apparaître uniquement le titre et l’année de sortie de chaque film
use("db_mflix");
db.movies.find({},{_id: 0, title:1, year: 1});

// ex 22 
// Dans le cadre d’une pagination qui renvoie à chaque fois une liste de 10 films par 
// page, voici la requête permettant de renvoyer uniquement la liste des films de la 
// 3e page 
use("db_mflix");
db.movies.find({}).skip(20).limit(10);

// ex 23
// Rechercher les films qui ont au moins la langue « française » ou la langue « anglaise »
// disponible, qui sont sortis à partir de « 1980 » inclus, et qui ont une note « Rotten 
// Tomatoe » de plus de 4 ou un score « IMDB » supérieur ou égal à 8. Nous voulons 
// également que « Brad Pitt » joue dans le film. Nous souhaitons n'avoir que les titres 
// pour pouvoir les afficher directement. Enfin, nous ne voulons pas que le « synopsis »
// du film parle de « nazis »
use("db_mflix");
db.movies.find({
    $or:[
        {languages: "English"},
        {languages: "French"}
    ],
    year: {$gte: 1980},
    $or:[
        {"tomatoes.rotten": {$gt: 4}},
        {"imdb.rating": {$gte: 8}}
    ],
    plot: {$ne:{$regex: /nazi/}},
    cast: "Brad Pitt"
},{_id: 0, title: 1});

// ex 24
// Nous voulons maintenant trier notre résultat suivant les « notes » attribués au film. 
// D'abord par la note « Rotten Tomatoe », puis par la note « IMDB »
use("db_mflix");
db.movies.find({
    $or:[
        {languages: "English"},
        {languages: "French"}
    ],
    year: {$gte: 1980},
    $or:[
        {"tomatoes.rotten": {$gt: 4}},
        {"imdb.rating": {$gte: 8}}
    ],
    plot: {$ne:{$regex: /nazi/}},
    cast: "Brad Pitt"
},{_id: 0, title: 1, "tomatoes.rotten": 1, "imdb.rating": 1}).sort({"tomatoes.rotten": -1, "imdb.rating": -1});
