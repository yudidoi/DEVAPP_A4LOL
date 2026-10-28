require('dotenv').config()

const express = require('express')
const cors = require('cors')

const banco = require('./banco')
const rotasUsuarios = require('./rotas/usuarios')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    sucesso: true,
    mensagem: 'API de usuários funcionando',
    dados: null
  })
})

app.use('/usuarios', rotasUsuarios)

const PORT = process.env.PORT || 3000

async function iniciarServidor() {
  try {
    await banco.query('SELECT NOW()')

    console.log('Conexão com o banco realizada com sucesso')

    app.listen(PORT, () => {
      console.log(`API de usuários rodando em http://localhost:${PORT}`)
    })
  } catch (erro) {
    console.error('Erro ao conectar com o banco:')
    console.error(erro.message)
  }
}

iniciarServidor()