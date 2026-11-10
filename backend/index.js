const express = require('express')
const app = express()
const cors = require('cors')

const funcionarioController = require('./controller/funcionario.controller')
const fornecedorController = require('./controller/fornecedor.controller')
const produtoController = require('./controller/produto.controller')
const movimentoController = require('./controller/movimento.controller')

const conn = require('./db/conn')
const hostname = 'localhost'
const PORT = 3000
//----------- Middleware ------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//---------------- Public Rotes ----------------
app.post('/funcionario', funcionarioController.cadastrar)


app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!!'})
})
//---------------- Private Rotes ----------------
app.post('/fornecedor', fornecedorController.cadastrar)
app.post('/produto', produtoController.cadastrar)
app.post('/movimento', movimentoController.cadastrar)

//-------------- Server -----------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname,()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao tentar conectar com o banco de dados!!')
})