const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Movimento = db.define('movimento',{
    codMovimento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo:{
        type: DataTypes.ENUM('ENTRADA', 'SAIDA'),
        allowNull: false
    },
    qtdeMovimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idProduto:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'produtos',
            key:'codProduto'
        }
    }
},{
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento