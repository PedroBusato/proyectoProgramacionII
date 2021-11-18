module.exports = (sequelize, dataTypes) => {
    const alias = "Post";       //Especificamos el nombre del modelo. En nuestro caso le colocamos el mismo nombre que a la tabla de mySQL 

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
            allowNule: true,
            type: dataTypes.STRING(500)
        },
        idUser: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        userName: {
            allowNull: true,
            type: dataTypes.STRING(150)
        },
        createdAt: {
            type: dataTypes.DATE,      
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    }
    
    const config = {
        tableName: "posts",          //En caso de querer, podemos especificar el nombre de la tabla a la cual se relaciona nuestro modelo
        timestamps: true,            //Habilitamos las columnas createdAt y updatedAt
        underscored: false           //Decimos que las columnas llevan nombres sin guiones bajos
    }                                //Recordemos que el nombre de la base de datos la habiamos aclarado en el archivo config.js

    const Post = sequelize.define(alias, columns, config);

    Post.associate = function(models){                      //Se trata de un callback --> La variable "models" trae consigo todos los modelos, pero lo caracteristico es que no hay que requerirlos
        Post.hasMany(models.Comment, {
            as: "comments",
            foreignKey: "idPost"
        }),
        Post.belongsTo(models.User, {
            as: "user",
            foreignKey: "idUser"
        }),
        Post.hasMany(models.Like, {
            as: 'likes',
            foreignKey: 'idPost'
        });
    }


    return Post;
}