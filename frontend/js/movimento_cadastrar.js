const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const tipo = document.getElementById('tipo').value
    const qtdeMovimento = Number(document.getElementById('qtdeMovimento').value)
    const data = document.getElementById('data').value
    const idProduto = Number(document.getElementById('idProduto').value)

    const valores ={
        tipo: tipo,
        qtdeMovimento: qtdeMovimento,
        data: data,
        idProduto: idProduto
    }

    fetch('http://localhost:3000/movimento',{
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
        res.innerHTML = "Erro ao tentar cadastrar movimento"
        console.error('Erro ao tentar cadastrar movimento',err)
    })
})