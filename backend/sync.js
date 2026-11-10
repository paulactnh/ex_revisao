const { Funcionario, Fornecedor, Produto, Movimento } = require('./models/rel')
const conn = require('./db/conn')
async function syncDataBase() {
    try {
        await conn.sync({force: true})
        console.log('Tabelas sincroizadas!!')
    } catch (err) {
        console.error('Erro ao tentar sincronizar!',err)
    }
    finally{
        await conn.close()
        console.log('Fechando conexão com o banco de dados...')
    }
}

syncDataBase()