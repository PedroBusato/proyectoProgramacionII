module.exports = (sequelize, dataTypes) => {
    const alias = "comments";       //Especificamos el nombre del modelo. En nuestro caso le colocamos el mismo nombre que a la tabla de mySQL (en plural) 

    const columns = {
        idComment: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER //Especificamos el tipo de dato de la columna
        },
        userName: {
            allowNull: false,
            type: dataTypes.STRING(150)
        },
        dateComment: {
            allowNule: false,
            type: dataTypes.DATE
        },
        commentText: {
            allowNull: false,
            type: dataTypes.STRING(300)
        },
        idPost: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        idUser: {
            allowNull: false,
            type: dataTypes.INTEGER
        }
    }
    
    const config = {
        tableName: "comments",          //En caso de querer, podemos especificar el nombre de la tabla a la cual se relaciona nuestro modelo
        timestamps: false,
        underscored:false
    }                               //Recordemos que el nombre de la base de datos la habiamos aclarado en el archivo config.js

    const Comment = sequelize.define(alias, columns, config)

    return Comment;
}