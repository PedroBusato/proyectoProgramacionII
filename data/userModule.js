const user = {
    lista: [
        {
        nombre: "Alejandro",
        apellido: "Magno",
        usuario: "alexanderTheGr8",
        email: "alexanderGreat@greekmail.com",
        contrasena: "hateGreeks",
        foto:"images/alejandroMagnoPerfil.jpg",
        fecha:"21/07/356aC",
        id: 0
        },
        {
        nombre: "Marco",
        apellido: "Aurelio",
        usuario: "FatherOfComodus",
        email: "Maurelio@yahoo.com.rome",
        contrasena: "wannaReturnHome",
        foto:"images/marcoAurelioPerfil.jpg",
        fecha:"26/04/121",
        id: 1
        },
        {
        nombre: "Gengis",
        apellido: "Kan",
        usuario: "FatherOfAll",
        email: "KanG@mongol.com",
        contrasena: "LoveMyself",
        foto:"images/gengisKanPerfil.jpg",
        fecha:"16/04/1162",
        id: 2
        },
        {
        nombre: "Winston",
        apellido: "Churchill",
        usuario: "QueenSaviour_",
        email: "ChruchillWinston@hotmail.com",
        contrasena: "FishAndChips123",
        foto:"images/winstonChurchillPerfil.jpg",
        fecha:"30/11/1874",
        id: 3
        }        
    ],
    findUser: function(user){
        for (let x = 0; x < this.lista.length; x++) {
            if (this.lista[x].usuario == user){
                return this.lista[x];
            }
        }
    }
}

module.exports = user;