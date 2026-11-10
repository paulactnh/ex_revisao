const Fornecedor = require('../models/Fornecedor')
const cryptoJS = require('crypto-js')
const CHAVE = 'segredo'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.nome || !valores.cpf || !valores.cnpj){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const cryptoCpf = cryptoJS.AES.encrypt(valores.cpf, CHAVE).toString()
        const cryptoCnpj = cryptoJS.AES.encrypt(valores.cnpj, CHAVE).toString()
        await Fornecedor.create({
            nome: valores.nome,
            cpf: cryptoCpf,
            cnpj: cryptoCnpj
        })
        res.status(201).json({message: "dados cadastrados com sucesso!!"})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar fornecedor!"})
        console.error('erro ao tentar cadastrar fornecedor!',err)
    }
}

module.exports = { cadastrar }