module.exports = (sequelize, dataTypes) => {
    
    const alias = "users";       //Especificamos el nombre del modelo. En nuestro caso le colocamos el mismo nombre que a la tabla de mySQL (en plural) 

    const columns = {
        idUser: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER //Especificamos el tipo de dato de la columna
        },
        userName: {
            allowNull: false,
            type: dataTypes.STRING(150)
        },
        firstName: {
            allowNull: false,
            type: dataTypes.STRING(150)
        },
        lastName: {
            allowNull: false,
            type: dataTypes.STRING(150)
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING(200),
            unique: true            // No confundir con la primary key! --> permite aclarar que se trata de un campo unico e irrepetible
        },
        userPassword: {
            allowNull: false,
            type: dataTypes.STRING(100)
        },
        profilePic: {
            allowNull: true,
            type: dataTypes.STRING(500)
        },
        birthDate: {
            allowNule: false,
            type: dataTypes.DATE
        },
        userFollowers: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        usersFollowing: {
            allowNull: false,
            type: dataTypes.INTEGER
        }
    }
    
    const config = {
        tableName: "users",          //En caso de querer, podemos especificar el nombre de la tabla a la cual se relaciona nuestro modelo
        timestamps: false,           //Como no declaramos la columna "timestamps" ponemos false como valor a la clave
        underscored:false
    }                               //Recordemos que el nombre de la base de datos la habiamos aclarado en el archivo config.js

    const User = sequelize.define(alias, columns, config)

    return User;
}