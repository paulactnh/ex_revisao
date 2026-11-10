const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value
    const cnpj = document.getElementById('cnpj').value

    const valores ={
        nome: nome,
        cpf: cpf,
        cnpj: cnpj
    }

    fetch('http://localhost:3000/fornecedor',{
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
        res.innerHTML = "Erro ao tentar cadastrar fornecedor"
        console.error('Erro ao tentar cadastrar fornecedor',err)
    })
})