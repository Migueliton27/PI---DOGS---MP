const {DataTypes, Op} = require('sequelize')

module.exports = (sequelize)=>{
    sequelize.define('race',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight:{
            type: DataTypes.STRING,
            allowNull: false
        },
        life_span:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
        }   
    },{
        timestamps: false
    })
}

/*
ID *
Nombre *
Altura *
Peso *
Años de vida
*/