// Recordemos los id:
// 0 --> Alejandro Magno
// 1 --> Marco Aurelio
// 2 --> Gengis Kan
// 3 --> Winston Churchill

const posts = {
    listaIndex : [
        {
        idPost:0,
        imagen: 'images/alejandroMagno.png',
        texto: "Discurso en Opis",
        fecha: "324 aC",
        idUsuario:0,
        usuario: "alexanderTheGr8",      //Clave foranea para enlazar con los datos de "userModule"
        idComentarios: [0,2]
        },
        {
        idPost:1,
        imagen: 'images/imagenPrueba2.jpg',
        texto: "Con mi amigo Aristoteles",
        fecha: "317 aC",
        idUsuario: 0,
        usuario: "alexanderTheGr8"
        },
        {
        idPost:2,
        imagen:"images/gengisKan.jpg",
        texto: "Entrando a China con las tropas #DinastiaJin",
        fecha: "1234",
        idUsuario: 2,
        usuario: "FatherOfAll"
        },
        {
        idPost:3,
        imagen:"images/winstonChurchill.png",
        texto: "Good ol' times",
        fecha: "1921",
        idUsuario: 3,
        usuario: "QueenSaviour_"
        },
        {
        idPost:4,
        imagen:"images/imagenPrueba.jpg",
        texto: "The greatest ever",
        fecha: "360aC",
        idUsuario: 0,
        usuario: "alexanderTheGr8"
        },
        {
        idPost:5,
        imagen:"images/marcoAurelio.jpg",
        texto: "Back from the North",
        fecha: "187",
        idUsuario: 1,
        usuario: "FatherOfComodus"
        }
    ],
    imagesByUsername: function(username){
        let array = [];
        for (let x = 0; x < this.listaIndex.length; x++) {
            if (this.listaIndex[x].usuario == username){
                array.push(this.listaIndex[x]);
            }
        }
        return array;
    },
    imagesById: function(id){                                 //Encuentra la imagen por id del usuario y la retorna automaticamente
        for (let x = 0; x < this.listaIndex.length; x++) {
            if (this.listaIndex[x].idUsuario == id){
                return (this.listaIndex[x]);                  //Nos devuelve solo una de las fotos, la primera que encuentra! Es suficiente para el index esto!
            }
        }
    }
}

module.exports = posts;