require('dotenv').config()

const express = require('express')
const cors = require('cors')

const AssistenteDocumento = require('./assistente-documento')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

let assistente

try {
  assistente = new AssistenteDocumento()
  console.log('Assistente de documento carregado com sucesso')
} catch (erro) {
  console.error('Erro ao carregar o assistente:')
  console.error(erro.message)
}

// Rota de saúde
app.get('/saude', (req, res) => {
  return res.json({
    status: 'OK'
  })
})

// Perguntar para a IA
app.post('/perguntar', async (req, res) => {
  try {
    const { pergunta } = req.body

    if (
      !pergunta ||
      typeof pergunta !== 'string' ||
      pergunta.trim() === ''
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A pergunta não pode estar vazia',
        dados: null
      })
    }

    if (pergunta.length > 500) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A pergunta deve ter no máximo 500 caracteres',
        dados: null
      })
    }

    if (!assistente) {
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Assistente de IA não foi inicializado',
        dados: null
      })
    }

    const resultado = await assistente.perguntar(
      pergunta.trim()
    )

    return res.json({
      sucesso: true,
      mensagem: 'Pergunta respondida com sucesso',
      dados: {
        resposta: resultado.resposta,
        tokens: resultado.tokens
      }
    })
  } catch (erro) {
    console.error('Erro ao consultar o Gemini:')
    console.error(erro)

    const mensagemErro =
      String(erro.message || '').toLowerCase()

    if (
      mensagemErro.includes('429') ||
      mensagemErro.includes('quota') ||
      mensagemErro.includes('rate limit')
    ) {
      return res.status(429).json({
        sucesso: false,
        mensagem:
          'Limite de uso da IA atingido. Tente novamente mais tarde.',
        dados: null
      })
    }

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao consultar o documento',
      dados: null
    })
  }
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `API de IA rodando em http://localhost:${PORT}`
    )
  })
}

module.exports = app