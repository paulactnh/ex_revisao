const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Produto = db.define('produto',{
    codProduto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    qtdeEstoque:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lote:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idFornecedor:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'fornecedores',
            key:'codFornecedor'
        }
    }
},{
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto