const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')
const CHAVE = 'segredo'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const cryptoSenha = cryptoJS.AES.encrypt(valores.senha, CHAVE).toString()
        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: cryptoSenha
        })
        res.status(201).json({message: "dados cadastrados com sucesso!!"})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar funcionario!"})
        console.error('erro ao tentar cadastrar funcionario!',err)
    }
}

module.exports = { cadastrar }