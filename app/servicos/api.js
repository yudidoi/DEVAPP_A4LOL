const API_URL = 'http://localhost:3000'

async function requisicao(caminho, opcoes = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(opcoes.headers || {})
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    const erro = new Error(dados.mensagem || 'Erro na API')
    erro.status = resposta.status
    throw erro
  }

  return dados
}

export function cadastrarUsuario(dadosUsuario) {
  return requisicao('/usuarios/cadastro', {
    method: 'POST',
    body: JSON.stringify(dadosUsuario)
  })
}

export function loginUsuario(email, senha) {
  return requisicao('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      senha
    })
  })
}

export function listarUsuarios(token) {
  return requisicao(
    '/usuarios',
    {
      method: 'GET'
    },
    token
  )
}

export function buscarUsuario(id, token) {
  return requisicao(
    `/usuarios/${id}`,
    {
      method: 'GET'
    },
    token
  )
}

export function alterarUsuario(id, dadosUsuario, token) {
  return requisicao(
    `/usuarios/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(dadosUsuario)
    },
    token
  )
}

export function excluirUsuario(id, token) {
  return requisicao(
    `/usuarios/${id}`,
    {
      method: 'DELETE'
    },
    token
  )
}