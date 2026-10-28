const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const banco = require('../banco')
const autenticacao = require('../middleware/autenticacao')

const router = express.Router()

// CADASTRAR USUÁRIO
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, sobrenome, email, usuario, senha } = req.body

    if (!nome || !sobrenome || !email || !usuario || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preencha todos os campos',
        dados: null
      })
    }

    const usuarioExistente = await banco.query(
      'SELECT id FROM usuarios WHERE email = $1 OR usuario = $2',
      [email, usuario]
    )

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'E-mail ou usuário já cadastrado',
        dados: null
      })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const resultado = await banco.query(
      `INSERT INTO usuarios
      (nome, sobrenome, email, usuario, senha)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nome, sobrenome, email, usuario`,
      [nome, sobrenome, email, usuario, senhaCriptografada]
    )

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Usuário cadastrado com sucesso',
      dados: resultado.rows[0]
    })
  } catch (erro) {
    console.error(erro)

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao cadastrar usuário',
      dados: null
    })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Informe o e-mail e a senha',
        dados: null
      })
    }

    const resultado = await banco.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'E-mail ou senha incorretos',
        dados: null
      })
    }

    const usuario = resultado.rows[0]

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'E-mail ou senha incorretos',
        dados: null
      })
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    return res.json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso',
      dados: {
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email,
          usuario: usuario.usuario
        }
      }
    })
  } catch (erro) {
    console.error(erro)

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao realizar login',
      dados: null
    })
  }
})

// LISTAR TODOS OS USUÁRIOS
router.get('/', autenticacao, async (req, res) => {
  try {
    const resultado = await banco.query(
      `SELECT id, nome, sobrenome, email, usuario, criado_em
       FROM usuarios
       ORDER BY nome`
    )

    return res.json({
      sucesso: true,
      mensagem: 'Usuários encontrados',
      dados: resultado.rows
    })
  } catch (erro) {
    console.error(erro)

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao listar usuários',
      dados: null
    })
  }
})

// BUSCAR USUÁRIO PELO ID
router.get('/:id', autenticacao, async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await banco.query(
      `SELECT id, nome, sobrenome, email, usuario, criado_em
       FROM usuarios
       WHERE id = $1`,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado',
        dados: null
      })
    }

    return res.json({
      sucesso: true,
      mensagem: 'Usuário encontrado',
      dados: resultado.rows[0]
    })
  } catch (erro) {
    console.error(erro)

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao buscar usuário',
      dados: null
    })
  }
})

// ALTERAR USUÁRIO
router.put('/:id', autenticacao, async (req, res) => {
  try {
    const { id } = req.params
    const { nome, sobrenome, email, usuario } = req.body

    if (!nome || !sobrenome || !email || !usuario) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preencha todos os campos',
        dados: null
      })
    }

    const existente = await banco.query(
      'SELECT id FROM usuarios WHERE id = $1',
      [id]
    )

    if (existente.rows.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado',
        dados: null
      })
    }

    const conflito = await banco.query(
      `SELECT id FROM usuarios
       WHERE (email = $1 OR usuario = $2)
       AND id <> $3`,
      [email, usuario, id]
    )

    if (conflito.rows.length > 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'E-mail ou usuário já está em uso',
        dados: null
      })
    }

    const resultado = await banco.query(
      `UPDATE usuarios
       SET nome = $1,
           sobrenome = $2,
           email = $3,
           usuario = $4
       WHERE id = $5
       RETURNING id, nome, sobrenome, email, usuario`,
      [nome, sobrenome, email, usuario, id]
    )

    return res.json({
      sucesso: true,
      mensagem: 'Usuário alterado com sucesso',
      dados: resultado.rows[0]
    })
  } catch (erro) {
    console.error(erro)

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao alterar usuário',
      dados: null
    })
  }
})

// EXCLUIR USUÁRIO
router.delete('/:id', autenticacao, async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await banco.query(
      `DELETE FROM usuarios
       WHERE id = $1
       RETURNING id, nome, sobrenome, email, usuario`,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado',
        dados: null
      })
    }

    return res.json({
      sucesso: true,
      mensagem: 'Usuário excluído com sucesso',
      dados: resultado.rows[0]
    })
  } catch (erro) {
    console.error(erro)

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao excluir usuário',
      dados: null
    })
  }
})

module.exports = router