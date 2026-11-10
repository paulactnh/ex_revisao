const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const descricao = document.getElementById('descricao').value
    const categoria = document.getElementById('categoria').value
    const qtdeEstoque = Number(document.getElementById('qtdeEstoque').value)
    const lote = document.getElementById('lote').value
    const idFornecedor = Number(document.getElementById('idFornecedor').value)

    const valores ={
        descricao: descricao,
        categoria: categoria,
        qtdeEstoque: qtdeEstoque,
        lote: lote,
        idFornecedor: idFornecedor
    }

    fetch('http://localhost:3000/produto',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        res.innerHTML = ''
        res.innerHTML += `${dados.message}`

        document.querySelector('form').reset()
    })
    .catch((err)=>{
        res.innerHTML = "Erro ao tentar cadastrar produto"
        console.error('Erro ao tentar cadastrar produto',err)
    })
})