module.exports = (sequelize, dataTypes) => {
    const alias = "Like";      

    const columns = {
        idLike: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        
    }
    
    const config = {
        tableName: "like",          
        timestamps: false,            
        underscored: false           
    }                               

    const Like = sequelize.define(alias, columns, config);

    Like.associate = function(models){                     
        Like.belongsTo(models.User, {
            as: "user",
            foreignKey: "idUser"
        }),
        Like.belongsTo(models.Post, {
            as: "post",
            foreignKey: "idPost"
        })
    }


    return Like;
}