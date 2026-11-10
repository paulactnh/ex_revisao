const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores ={
        nome: nome,
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/funcionario',{
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
        res.innerHTML = "Erro ao tentar cadastrar funcionário"
        console.error('Erro ao tentar cadastrar funcionário',err)
    })
})