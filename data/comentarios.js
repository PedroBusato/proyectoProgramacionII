// Recordemos los idUsuario:
// 0 --> Alejandro Magno
// 1 --> Marco Aurelio
// 2 --> Gengis Kan
// 3 --> Winston Churchill
// 4 --> Julio Cesar  
// 5 --> Socrates Sofronisco
// 6 --> Henry VIII
// 7 --> Ivar Ragnarsson
// 8 --> Diogenes De Sinope
// 9 --> Napoleon Bonaparte


const comentarios = {
    lista: [
        {
        idComentario: 0,
        texto:"Alejandro Magno volve a Macedonia",
        fecha: "324 aC",
        usuario: "FatherOfComodus",
        idUsuario: 1,                             //idUsuario es nuestra clave foranea, que permite vincularnos con la tabla de usuarios
        idPost: 0                                 //idPost es nuestra clave foranea, que permite vincularnos con la tabla de posts!
        },
        {
        idComentario: 1,
        texto:"Gengis Kan, China h8s u!",
        fecha: "1233",
        usuario: "alexanderTheGr8",
        idUsuario: 0,                             
        idPost: 2                               
        },
        {
        idComentario: 2,
        texto:"αγαπάμε τον Μέγα Αλέξανδρο",
        fecha: "322 aC",
        usuario: "FatherOfAll",
        idUsuario: 2,                             
        idPost: 0                               
        },
        {
        idComentario: 3,
        texto:"Stop attacking the Chinese",
        fecha: "1231",
        usuario: "alexanderTheGr8",
        idUsuario: 0,                             
        idPost: 2                               
        },
        {
        idComentario: 4,
        texto:"I love myself (and my Queen)",
        fecha: "1942",
        usuario: "QueenSaviour_",
        idUsuario: 3,                                
        idPost: 3                               
        },
        {
        idComentario: 5,
        texto:"LONG LIVE THE ROMAN EMPIRE #SPQR",
        fecha: "189",
        usuario: "QueenSaviour_",
        idUsuario: 4,                             
        idPost: 5                               
        },
        {
        idComentario: 6,
        texto:"Appellatio non est bonum",
        fecha: "1940",
        usuario: "FatherOfComodus",
        idUsuario: 1,                             
        idPost: 3                               
        },
        {
        idComentario: 7,
        texto:"Mucha filosofia poca guerra Marco Aurelio. #bringBackNeron",
        fecha: "185",
        usuario: "FatherOfAll",
        idUsuario: 2,                             
        idPost: 5                               
        },
        {
        idComentario: 8,
        texto:"Should have checked your back",
        fecha: "79aC",
        usuario: "alexanderTheGr8",
        idUsuario: 0,                             
        idPost: 6                              
        },
        {
        idComentario: 8,
        texto:"23? More like Jordan I think. HAHAHA",
        fecha: "79aC",
        usuario: "Boneless",
        idUsuario: 7,                             
        idPost: 6                              
        },
        {
        idComentario: 9,
        texto:"Como se que exististe si no dejaste nada escrito? #LonguevieàlaFrance",
        fecha: "448aC",
        usuario: "NapoleonMandaparte",
        idUsuario: 9,                             
        idPost: 7                               
        },
        {
        idComentario: 9,
        texto:"Y pensar que yo soy considerado orgulloso. Te tomaste veneno en lugar de aceptar tu error.",
        fecha: "448aC",
        usuario: "NapoleonMandaparte",
        idUsuario: 9,                             
        idPost: 7                               
        },
        {
        idComentario: 10,
        texto:"Guess you are the problem mate.",
        fecha: "1522",
        usuario: "Boneless",
        idUsuario: 7,                             
        idPost: 8                               
        },
        {
        idComentario: 10,
        texto:"Las cosas con Josefina andan mal, pero al lado tuyo...",
        fecha: "1522",
        usuario: "NapoleonMandaparte",
        idUsuario: 9,                             
        idPost: 8                               
        },
        {
        idComentario: 11,
        texto:"We have someone as intelligent as you in our times. Brilliant!",
        fecha: "880",
        usuario: "QueenSaviour_",
        idUsuario: 3,                             
        idPost: 9                               
        },
        {
        idComentario: 11,
        texto:"Wanna stablish an alliance? Kiding, u r already dead",
        fecha: "880",
        usuario: "FatherOfAll",
        idUsuario: 2,                             
        idPost: 9                               
        },
        {
        idComentario: 12,
        texto:"Me moves de nuevo con la prepotencia con la que lo hiciste y te las vas a ver",
        fecha: "368aC",
        usuario: "alexanderTheGr8",
        idUsuario: 0,                             
        idPost: 10                               
        },
        {
        idComentario: 12,
        texto:"Te diria que te falta calle, pero justamente lo contrario",
        fecha: "368aC",
        usuario: "alexanderTheGr8",
        idUsuario: 0,                             
        idPost: 10                               
        },
        {
        idComentario: 13,
        texto:"Petiso",
        fecha: "1800",
        usuario: "homelessBrilliance",
        idUsuario: 8,                             
        idPost: 11                               
        },
        {
        idComentario: 13,
        texto:"HAHAHA Tiny Man",
        fecha: "1800",
        usuario: "Boneless",
        idUsuario: 7,                             
        idPost: 11                               
        },
        {
        idComentario: 14,
        texto:"Did not know modern France had goblins",
        fecha: "1800",
        usuario: "Boneless",
        idUsuario: 7,                             
        idPost: 11                               
        }

    ],
    commentsById: function(idPost){
        let array = [];
        for (let i = 0; i < this.lista.length; i++) {
            if (this.lista[i].idPost == idPost) {            //Verificar la utilidad de esta funcion
                array.push(this.lista[i])
            }
        }
        return array
    }
}



module.exports = comentarios;