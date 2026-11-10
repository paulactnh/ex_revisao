const Produto = require('../models/Produto')
const Fornecedor = require('../models/Fornecedor')
const cryptoJS = require('crypto-js')
const CHAVE = 'segredo'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.descricao || !valores.categoria || !valores.qtdeEstoque ||!valores.lote ||!valores.idFornecedor){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const fornecedor = await Fornecedor.findByPk(valores.idFornecedor)
        if(!fornecedor){
            return res.status(404).json({message: 'Fornecedor inexistente!!'})
        }

        const cryptoLote = cryptoJS.AES.encrypt(valores.lote, CHAVE).toString()
        await Produto.create({
            descricao: valores.descricao,
            categoria: valores.categoria,
            qtdeEstoque: valores.qtdeEstoque,
            lote: cryptoLote,
            idFornecedor: valores.idFornecedor
        })
        res.status(201).json({message: "dados cadastrados com sucesso!!"})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar produto!"})
        console.error('erro ao tentar cadastrar produto!',err)
    }
}

module.exports = { cadastrar }