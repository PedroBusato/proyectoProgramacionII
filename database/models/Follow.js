// Representa una entidad que representa la relacion entre seguidor y seguido

module.exports = (sequelize, dataTypes) => {
    const alias = "Follow";      

    const columns = {
        idFollow: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        // idFollower: {
        //     type: dataTypes.INTEGER
        // },
        // idFollowing:{
        //     type: dataTypes.INTEGER
        // }
    }
    
    const config = {
        tableName: "follow",          //En caso de querer, podemos especificar el nombre de la tabla a la cual se relaciona nuestro modelo
        timestamps: false,            //Habilitamos las columnas createdAt y updatedAt
        underscored: false           //Decimos que las columnas llevan nombres sin guiones bajos
    }                                //Recordemos que el nombre de la base de datos la habiamos aclarado en el archivo config.js

    const Follow = sequelize.define(alias, columns, config);

    Follow.associate = function(models){                      //Se trata de un callback --> La variable "models" trae consigo todos los modelos, pero lo caracteristico es que no hay que requerirlos
        Follow.belongsTo(models.User, {
            as: "follower",
            foreignKey: "idFollower"
        }),
        Follow.belongsTo(models.User, {
            as: "following",
            foreignKey: "idFollowing"
        })
    }


    return Follow;
}