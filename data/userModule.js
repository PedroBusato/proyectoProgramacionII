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
        },        
        {
        nombre: "Julio",
        apellido: "Cesar",
        usuario: "23StabsMan",
        email: "JulioCesar@hotmail.com",
        contrasena: "CaesarRome123",
        foto:"images/julioCesarPerfil.jpg",
        fecha:"17/09/80aC",
        id: 4
        },
        {
        nombre: "Socrates",
        apellido: "Sofronisco",
        usuario: "writeLessMind",
        email: "SocratesSofronisco@atenas.com",
        contrasena: "MasterOfPlaton",
        foto:"images/socratesPerfil.jpg",
        fecha:"02/12/450aC",
        id: 5
        },
        {
        nombre: "Henry",
        apellido: "VIII",
        usuario: "queenSlayer",
        email: "HenryVIII@outlook.com",
        contrasena: "KingOfKings",
        foto:"images/henryViiiPerfil.jpg",
        fecha:"12/05/1522",
        id: 6
        },
        {
        nombre: "Ivar",
        apellido: "Ragnarsson",
        usuario: "Boneless",
        email: "RagnarssonB@skol.com",
        contrasena: "RagnarGod",
        foto:"images/ivarRagnarssonPerfil.jpg",
        fecha:"09/09/830dC",
        id: 7
        },
        {
        nombre: "Diogenes",
        apellido: "De Sinope",
        usuario: "homelessBrilliance",
        email: "DeSinopeDiogenes@hotmail.com",
        contrasena: "AtenasNewHome",
        foto:"images/diogenesDeSinopePerfil.jpg",
        fecha:"28/11/370aC",
        id: 8
        },
        {
        nombre: "Napoleon",
        apellido: "Bonaparte",
        usuario: "NapoleonMandaparte",
        email: "NapoleonBonaparte@hotmail.com",
        contrasena: "Greedpower",
        foto:"images/napoleonBonapartePerfil.jpg",
        fecha:"12/12/1799",
        id: 9
        }, 


    ],
    findUser: function(user){
        for (let i = 0; i < this.lista.length; i++) {
            if (this.lista[i].usuario == user){
                return this.lista[i];
            }
        }
    }
}

module.exports = user;