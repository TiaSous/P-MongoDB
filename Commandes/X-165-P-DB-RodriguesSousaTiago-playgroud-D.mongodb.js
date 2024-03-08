// ex 1
// Compter le nombre de films par genre
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: "$genres",
            NombreFilms: {
                $count: {}
            }
        }
    }
]);

// ex 2
// Compter le nombre de films par classification (rated)
use("db_mflix");
db.movies.aggregate([
    {
        $group: {
            _id: "$rated",
            NombreFilms: {
                $count: {}
            }
        }
    }
]);

// ex 3
// Calculer la durée moyenne des films par genre
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: "$genres",
            TempsMoyen: {
                $avg: "$runtime"
            }
        }
    },
    {
        $addFields: {
            TempsMoyen: {
                $round: ["$TempsMoyen", 0]
            }
        }
    }
]);

// ex 4
// Calculer la durée moyenne des films par décennie
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            year: { $type: "number" }
        }
    },
    {
        $addFields: {
            decennie: {
                $round: ["$year", -1]
            }
        }
    },
    {
        $group: {
            _id: "$decennie",
            TempsMoyen: {
                $avg: "$runtime"
            }
        }
    },
    {
        $addFields: {
            TempsMoyen: {
                $round: ["$TempsMoyen", 0]
            }
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
]);

// ex 5
// Calculer la durée moyenne des films par acteur
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: "$cast",
            TempsMoyen: {
                $avg: "$runtime"
            }
        }
    },
    {
        $addFields: {
            TempsMoyen: {
                $round: ["$TempsMoyen", 0]
            }
        }
    }
]);

// ex 6
// Lister les 5 réalisateurs les plus fréquents
use("db_mflix");
db.movies.aggregate([
    {
        $group: {
            _id: "$directors",
            NombreFilms: {
                $count: {}
            }
        }
    },
    {
        $sort: {
            NombreFilms: -1
        }
    },
    {
        $limit: 5
    }
]);

// ex 7
// Lister les 5 acteurs les plus fréquents dans les films « PG-13 »
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            rated: "PG-13"
        }
    },
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: "$cast",
            NombreFilms: {
                $count: {}
            }
        }
    },
    {
        $sort: {
            NombreFilms: -1
        }
    },
    {
        $limit: 5
    }
]);

// ex 8
// Quel est le nombre moyen de commentaires par film
use("db_mflix");
db.movies.aggregate([
    {
        $group: {
            _id: null,
            NombreCommentairesMoyennes: {
                $avg: "$num_mflix_comments"
            }
        }

    }
]);

// ex 9
// Le genre le plus populaire par année
// TODO n'affiche qu'un genre
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: { annee: "$year", genres: "$genres" },
            count: {
                $count: {}
            }
        }
    },
    {
        $sort: {
            count: -1
        }
    },
    {
        $group: {
            _id: "$_id.annee",
            GenrePlusPopulaire: {
                $first: "$_id.genres"
            }
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
]);

// ex 10
// Lister les genres distincts des films
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: "$genres",
        }
    }
])

// ex 11
// Lister les films par décennie avec le nombre total de films par décennie
// TODO problème avec le count il en affiche un de trop compte les doublons
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            year: { $type: "number" }
        }
    },
    {
        $addFields: {
            decennie: {
                $round: ["$year", -1]
            }
        }
    },
    {
        $group: {
            _id: "$decennie",
            NombreFilms: {
                $count: {}
            },
            ListeFilms: {
                $push: "$title"
            },
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
]);

// ex 12
// Trouver le genre le plus courant dans chaque pays
// TODO n'affiche qu'un genre
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$countries"
    },
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: { pays: "$countries", genres: "$genres" },
            count: {
                $count: {}
            }
        }
    },
    {
        $sort: {
            count: -1
        }
    },
    {
        $group: {
            _id: "$_id.pays",
            GenrePlusPopulaire: {
                $first: "$_id.genres"
            }
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
]);

// ex 13
// Trouver le nombre de films par classification et par décennie
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            year: { $type: "number" }
        }
    },
    {
        $addFields: {
            decennie: {
                $round: ["$year", -1]
            }
        }
    },
    {
        $group: {
            _id: { decennie: "$decennie", classification: "$rated" },
            NombreFilms: {
                $count: {}
            },
            ListeFilms: {
                $push: "$title"
            },
        }
    },
    {
        $sort: {
            _id: -1
        }
    }
]);

// ex 14
// Calculer le nombre total de films et la durée moyenne des films par réalisateur
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            NombreFilms: {
                $count: {}
            },
            TempsMoyenFilms: {
                $avg: "$runtime"
            }
        }
    }
]);

// ex 15
// Notre objectif est de créer des groupes par pays. Pour chaque pays, nous voulons 
// créer des groupes de chaque genre et obtenir le nombre de films, la note moyenne 
// des films et la part de marché (nombre de films d'un genre pour un pays / total de 
// films du pays).
use("db_mflix");
db.movies.aggregate(
    {
        $unwind: "$countries"
    },
    {
        $unwind: "$genres"
    },
    {
        $group:{
            _id: {pays: "$countries", genre: "$genres"},
            NombreFilms: {$count:{}},
            MoyenneNote: {$avg: "$imdb.rating"},
        }
    },
    {
        $group: {
            _id: "$_id.pays",
            genres: {
                $push: {
                   genre: "$_id.genre",
                   NombreFilms: "$NombreFilms",
                   MoyenneNote: {$round:["$MoyenneNote",0 ]}
                }
            },
            NombreFilmsPays: {
                $sum: "$NombreFilms"
            }
        }
    },
    {
        $addFields: {
            "genres": {
                $map: {
                    input: "$genres",
                    as: "genre",
                    in: {
                        genre: "$$genre.genre",
                        NombreFilms: "$$genre.NombreFilms",
                        MoyenneNote: "$$genre.MoyenneNote",
                        PartDeMarche: {
                            $multiply: [{$divide: ["$$genre.NombreFilms", "$NombreFilmsPays"]}, 100]
                        }
                    }
                }
            }
        }
    }
);
