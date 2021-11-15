module.exports = (sequelize, dataTypes) => {
    
    const alias = "User";       //Especificamos el nombre del modelo. En nuestro caso le colocamos el mismo nombre que a la tabla de mySQL (en plural) 

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
        userFollowers: {                  //Pehuen dijo que debemos borrar estas dos columnas en un futuro, pero por el momento las dejamos ya que las necesitamos para nuestra vista "detalleUsuario"
            allowNull: true,              //
            type: dataTypes.INTEGER
        },
        usersFollowing: {
            allowNull: true,             //Aceptamos que sean NULL ya que en la vista de registro no solicitamos dicha informacion
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE,      
        },
        updatedAt: {
            type: dataTypes.DATE
        }
        
    }
    
    const config = {
        tableName: "users",          //En caso de querer, podemos especificar el nombre de la tabla a la cual se relaciona nuestro modelo
        timestamps: true,           
        underscored:false
    }                                //Recordemos que el nombre de la base de datos la habiamos aclarado en el archivo config.js

    const User = sequelize.define(alias, columns, config);

    User.associate = function(models){
        User.hasMany(models.Post, {
            as: "posts",                        //En los controllers, cuando llamemos a las asociaciones, debemos llamarlos por este mismo nombre
            foreignKey: "idUser"                
        }),
        User.hasMany(models.Follow, {
            as: "followers",                     
            foreignKey: "idFollowing"           //no seria idUser?
        }),
        User.hasMany(models.Follow, {
            as: "followings",                       
            foreignKey: "idFollower"           //no seria idUser?
        })

    }

    return User;
}