const jwt = require('jsonwebtoken')
require('dotenv').config()

function autenticacao(req, res, next) {
  const cabecalho = req.headers.authorization

  if (!cabecalho) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Token não informado',
      dados: null
    })
  }

  const partes = cabecalho.split(' ')

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Token inválido',
      dados: null
    })
  }

  const token = partes[1]

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET)

    req.usuario = dados

    next()
  } catch (erro) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Token inválido ou expirado',
      dados: null
    })
  }
}

module.exports = autenticacao