module.exports = (sequelize, dataTypes) => {
    const alias = "posts";       //Especificamos el nombre del modelo. En nuestro caso le colocamos el mismo nombre que a la tabla de mySQL (en plural) 

    const columns = {
        idPost: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER //Especificamos el tipo de dato de la columna
        },
        image: {
            allowNull: false,
            type: dataTypes.STRING(500)
        },
        postDescription: {
            allowNule: false,
            type: dataTypes.STRING(500)
        },
        postedDate: {
            allowNull: false,
            type: dataTypes.DATE
        },
        idUser: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        userName: {
            allowNull: false,
            type: dataTypes.STRING(150)
        }
    }
    
    const config = {
        tableName: "posts",          //En caso de querer, podemos especificar el nombre de la tabla a la cual se relaciona nuestro modelo
        timestamps: false,
        underscored:false
    }                               //Recordemos que el nombre de la base de datos la habiamos aclarado en el archivo config.js

    const Post = sequelize.define(alias, columns, config);
    return Post;
}