import { useState } from 'react'

import TelaLogin from './telas/TelaLogin'
import TelaCadastro from './telas/TelaCadastro'
import TelaPrincipal from './telas/TelaPrincipal'
import TelaUsuarios from './telas/TelaUsuarios'
import TelaEditarUsuario from './telas/TelaEditarUsuario'

export default function App() {
  const [tela, setTela] = useState('login')
  const [token, setToken] = useState(null)
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
  const [mensagemLogin, setMensagemLogin] = useState('')

  function entrar(tokenRecebido, usuario) {
    setToken(tokenRecebido)
    setUsuarioLogado(usuario)
    setMensagemLogin('')
    setTela('principal')
  }

  function abrirCadastro() {
    setMensagemLogin('')
    setTela('cadastro')
  }

  function voltarDoCadastro(mensagem = '') {
    setMensagemLogin(mensagem)
    setTela('login')
  }

  function abrirUsuarios() {
    setTela('usuarios')
  }

  function abrirEdicao(usuario) {
    setUsuarioSelecionado(usuario)
    setTela('editar')
  }

  function voltarDaEdicao() {
    setUsuarioSelecionado(null)
    setTela('usuarios')
  }

  function usuarioExcluido() {
    setUsuarioSelecionado(null)
    setTela('usuarios')
  }

  function sair() {
    setToken(null)
    setUsuarioLogado(null)
    setUsuarioSelecionado(null)
    setMensagemLogin('')
    setTela('login')
  }

  function sessaoExpirada() {
    setToken(null)
    setUsuarioLogado(null)
    setUsuarioSelecionado(null)
    setMensagemLogin('Sua sessão expirou, entre de novo')
    setTela('login')
  }

  if (tela === 'cadastro') {
    return (
      <TelaCadastro
        aoVoltar={voltarDoCadastro}
      />
    )
  }

  if (tela === 'principal' && token) {
    return (
      <TelaPrincipal
        usuario={usuarioLogado}
        aoAbrirUsuarios={abrirUsuarios}
        aoSair={sair}
      />
    )
  }

  if (tela === 'usuarios' && token) {
    return (
      <TelaUsuarios
        token={token}
        aoVoltar={() => setTela('principal')}
        aoEditar={abrirEdicao}
        aoSessaoExpirada={sessaoExpirada}
      />
    )
  }

  if (
    tela === 'editar' &&
    token &&
    usuarioSelecionado
  ) {
    return (
      <TelaEditarUsuario
        usuario={usuarioSelecionado}
        token={token}
        aoVoltar={voltarDaEdicao}
        aoExcluir={usuarioExcluido}
        aoSessaoExpirada={sessaoExpirada}
      />
    )
  }

  return (
    <TelaLogin
      aoEntrar={entrar}
      aoCadastrar={abrirCadastro}
      mensagemInicial={mensagemLogin}
    />
  )
}