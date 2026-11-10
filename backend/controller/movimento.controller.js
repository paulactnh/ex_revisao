const Movimento = require('../models/Movimento')
const Produto = require('../models/Produto')

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.tipo || !valores.qtdeMovimento || !valores.data ||!valores.idProduto){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const produto = await Produto.findByPk(valores.idProduto)
        if(!produto){
            return res.status(404).json({message: 'Produto inexistente!!'})
        }

        let novoEstoque = 0
        if(valores.tipo === 'ENTRADA'){
            novoEstoque = valores.qtdeMovimento + produto.qtdeEstoque
        }else if(valores.tipo === 'SAIDA'){
            if(produto.qtdeEstoque < valores.qtdeMovimento){
                return res.status(401).json({message: "Saldo Insuficiente!!"})
            }else{
                novoEstoque = produto.qtdeEstoque - valores.qtdeMovimento
            }
        }
        await Produto.update({
            descricao: produto.descricao,
            categoria: produto.categoria,
            qtdeEstoque: novoEstoque,
            lote: produto.lote,
            idFornecedor: produto.idFornecedor,
        },{where:{codProduto: valores.idProduto}})


        await Movimento.create(valores)
        res.status(201).json({message: "dados cadastrados com sucesso!!"})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar movimento!"})
        console.error('erro ao tentar cadastrar movimento!',err)
    }
}

module.exports = { cadastrar }