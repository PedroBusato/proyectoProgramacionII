// Recordemos los id:
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

const moduloComments = require("../data/comentarios");

const posts = {
    listaIndex : [
        {
        idPost:0,
        imagen: '/images/alejandroMagno.png',
        texto: "Discurso en Opis",
        fecha: "324 aC",
        idUsuario:0,
        usuario: "alexanderTheGr8",                     //Clave foranea para enlazar con los datos de "userModule"
        comentarios: moduloComments.commentsById(0)
        },
        {
        idPost:1,
        imagen: '/images/imagenPrueba2.jpg',
        texto: "Con mi amigo Aristoteles",
        fecha: "317 aC",
        idUsuario: 0,
        usuario: "alexanderTheGr8",
        comentarios: moduloComments.commentsById(1)
        },
        {
        idPost:2,
        imagen:"/images/gengisKan.jpg",
        texto: "Entrando a China con las tropas #DinastiaJin",
        fecha: "1234",
        idUsuario: 2,
        usuario: "FatherOfAll",
        comentarios: moduloComments.commentsById(2)
        },
        {
        idPost:3,
        imagen:"/images/winstonChurchill.png",
        texto: "Good ol' times",
        fecha: "1921",
        idUsuario: 3,
        usuario: "QueenSaviour_",
        comentarios: moduloComments.commentsById(3)
        },
        {
        idPost:4,
        imagen:"/images/imagenPrueba.jpg",
        texto: "The greatest ever",
        fecha: "360aC",
        idUsuario: 0,
        usuario: "alexanderTheGr8",
        comentarios: moduloComments.commentsById(4)
        },
        {
        idPost:5,
        imagen:"/images/marcoAurelio.jpg",
        texto: "Back from the North",
        fecha: "187",
        idUsuario: 1,
        usuario: "FatherOfComodus",
        comentarios: moduloComments.commentsById(5)
        },        
        {
        idPost:6,
        imagen:"/images/julioCesarPost.jpg",
        texto: "#true #own #thoughts",
        fecha: "79aC",
        idUsuario: 4,
        usuario: "23StabsMan",
        comentarios: moduloComments.commentsById(6)
        },
        {
        idPost:7,
        imagen:"/images/socratesPost.jpg",
        texto: "Tarde de té y dialogo con ellos",
        fecha: "448aC",
        idUsuario: 5,
        usuario: "writeLessMind",
        comentarios: moduloComments.commentsById(7)
        },       
        {
        idPost:8,
        imagen:"/images/henryViiiPost.jpg",
        texto: "Mis esposas. Las amo! <3",
        fecha: "1522",
        idUsuario: 6,
        usuario: "queenSlayer",
        comentarios: moduloComments.commentsById(8)
        },
        {
        idPost:9,
        imagen:"/images/ivarRagnarssonPost.jpg",
        texto: "Who needs legs when you can conquer Europe with your mind?",
        fecha: "880dC",
        idUsuario: 7,
        usuario: "Boneless",
        comentarios: moduloComments.commentsById(9)
        },
        {
        idPost:10,
        imagen:"/images/diogenesDeSionopePost.jpg",
        texto: "Quien se cree que es este para taparme la luz del sol? #cancelAlexanderTheGreat",
        fecha: "368aC",
        idUsuario: 8,
        usuario: "homelessBrilliance",
        comentarios: moduloComments.commentsById(10)
        },
        {
        idPost:11,
        imagen:"/images/napoleonBonapartePost.jpg",
        texto: "L'avarice casse le sac",
        fecha: "1800",
        idUsuario: 9,
        usuario: "NapoleonMandaparte",
        comentarios: moduloComments.commentsById(11)
        },
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
    imagesById: function(id){                                  //Encuentra la imagen por id del usuario y la retorna automaticamente
        for (let x = 0; x < this.listaIndex.length; x++) {
            if (this.listaIndex[x].idUsuario == id){
                return (this.listaIndex[x]);                  //Nos devuelve solo una de las fotos, la primera que encuentra! Es suficiente para el index esto!
            }
        }
    },
    imagesByPostId: function(id){
        for (let i = 0; i < this.listaIndex.length; i++) {
            if (this.listaIndex[i].idPost == id) {
                return (this.listaIndex[i])
            }
            
        }
    }
}

module.exports = posts;