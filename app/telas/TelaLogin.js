import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { loginUsuario } from '../servicos/api'

export default function TelaLogin({
  aoEntrar,
  aoCadastrar,
  mensagemInicial = ''
}) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState(mensagemInicial)
  const [carregando, setCarregando] = useState(false)

  async function fazerLogin() {
    if (!email || !senha) {
      setMensagem('Informe o e-mail e a senha')
      return
    }

    try {
      setCarregando(true)
      setMensagem('')

      const resposta = await loginUsuario(email, senha)

      aoEntrar(
        resposta.dados.token,
        resposta.dados.usuario
      )
    } catch (erro) {
      setMensagem(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.caixa}>
        <Text style={styles.logo}>LEAGUE OF WIKIS</Text>

        <Text style={styles.titulo}>
          Entre em Runeterra
        </Text>

        <Text style={styles.subtitulo}>
          Acesse sua conta para explorar campeões,
          skins, runas e habilidades.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#7f8c8d"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#7f8c8d"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {mensagem ? (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.botao,
            carregando && styles.botaoDesativado
          ]}
          onPress={fazerLogin}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={aoCadastrar}
        >
          <Text style={styles.textoSecundario}>
            Criar uma conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  caixa: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#0a1428',
    padding: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#463714'
  },

  logo: {
    color: '#c89b3c',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 10
  },

  titulo: {
    color: '#f0e6d2',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },

  subtitulo: {
    color: '#a09b8c',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 21
  },

  input: {
    backgroundColor: '#091428',
    color: '#f0e6d2',
    padding: 14,
    borderRadius: 6,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1e3a4c'
  },

  mensagem: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 14
  },

  botao: {
    backgroundColor: '#c89b3c',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center'
  },

  botaoDesativado: {
    opacity: 0.6
  },

  textoBotao: {
    color: '#091428',
    fontSize: 16,
    fontWeight: 'bold'
  },

  botaoSecundario: {
    marginTop: 18,
    alignItems: 'center'
  },

  textoSecundario: {
    color: '#0ac8b9',
    fontSize: 15,
    fontWeight: 'bold'
  }
})