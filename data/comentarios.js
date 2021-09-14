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
        texto:"alejo1",
        fecha: "79aC",
        usuario: "alexanderTheGr8",
        idUsuario: 0,                             
        idPost: 6                              
        },
        {
        idComentario: 9,
        texto:"alejo2",
        fecha: "448aC",
        usuario: "NapoleonMandaparte",
        idUsuario: 9,                             
        idPost: 7                               
        },
        {
            idComentario: 10,
            texto:"alejo3",
            fecha: "1522",
            usuario: "23StabsMan",
            idUsuario: 4,                             
            idPost: 8                               
            },
            {
                idComentario: 11,
                texto:"alejo4",
                fecha: "880dC",
                usuario: "FatherOfAll",
                idUsuario: 2,                             
                idPost: 9                               
                },
        
                {
                    idComentario: 12,
                    texto:"alejo5",
                    fecha: "368aC",
                    usuario: "writeLessMind",
                    idUsuario: 5,                             
                    idPost: 10                               
                    },
                    {
                        idComentario: 13,
                        texto:"alejo6",
                        fecha: "1800",
                        usuario: "homelessBrilliance",
                        idUsuario: 8,                             
                        idPost: 11                               
                        },
                               




        
        // {
        // idComentario: 8,
        // texto:"αγαπάμε τον Μέγα Αλέξανδρο",
        // fecha: "322 aC",
        // usuario: "FatherOfAll",
        // idUsuario: 2,                             
        // idPost: 0                               
        // },
        // {
        // idComentario: 9,
        // texto:"αγαπάμε τον Μέγα Αλέξανδρο",
        // fecha: "322 aC",
        // usuario: "FatherOfAll",
        // idUsuario: 2,                             
        // idPost: 0                               
        // }
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