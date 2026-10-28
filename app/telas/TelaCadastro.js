import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'

import { cadastrarUsuario } from '../servicos/api'

export default function TelaCadastro({ aoVoltar }) {
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function cadastrar() {
    if (!nome || !sobrenome || !email || !usuario || !senha) {
      setMensagem('Preencha todos os campos')
      return
    }

    try {
      setCarregando(true)
      setMensagem('')

      await cadastrarUsuario({
        nome,
        sobrenome,
        email,
        usuario,
        senha
      })

      aoVoltar('Cadastro realizado com sucesso. Faça o login.')
    } catch (erro) {
      setMensagem(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.caixa}>
        <Text style={styles.logo}>
          LEAGUE OF WIKIS
        </Text>

        <Text style={styles.titulo}>
          Criar conta
        </Text>

        <Text style={styles.subtitulo}>
          Cadastre-se para explorar o universo de Runeterra
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#7f8c8d"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          placeholderTextColor="#7f8c8d"
          value={sobrenome}
          onChangeText={setSobrenome}
        />

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
          placeholder="Nome de invocador"
          placeholderTextColor="#7f8c8d"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
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
          onPress={cadastrar}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => aoVoltar('')}
        >
          <Text style={styles.textoSecundario}>
            Voltar para o login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    fontSize: 29,
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