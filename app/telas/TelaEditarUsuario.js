import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native'

import {
  alterarUsuario,
  excluirUsuario
} from '../servicos/api'

export default function TelaEditarUsuario({
  usuario,
  token,
  aoVoltar,
  aoExcluir,
  aoSessaoExpirada
}) {
  const [nome, setNome] = useState(usuario.nome)
  const [sobrenome, setSobrenome] = useState(usuario.sobrenome)
  const [email, setEmail] = useState(usuario.email)
  const [nomeUsuario, setNomeUsuario] = useState(usuario.usuario)

  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [confirmarExclusao, setConfirmarExclusao] = useState(false)

  async function salvarAlteracoes() {
    if (!nome || !sobrenome || !email || !nomeUsuario) {
      setMensagem('Preencha todos os campos')
      return
    }

    try {
      setCarregando(true)
      setMensagem('')

      await alterarUsuario(
        usuario.id,
        {
          nome,
          sobrenome,
          email,
          usuario: nomeUsuario
        },
        token
      )

      setMensagem('Invocador alterado com sucesso')
    } catch (erro) {
      if (erro.status === 401) {
        aoSessaoExpirada()
        return
      }

      setMensagem(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  async function confirmarExcluir() {
    try {
      setCarregando(true)
      setMensagem('')

      await excluirUsuario(usuario.id, token)

      setConfirmarExclusao(false)
      aoExcluir()
    } catch (erro) {
      if (erro.status === 401) {
        aoSessaoExpirada()
        return
      }

      setConfirmarExclusao(false)
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
          Editar invocador
        </Text>

        <Text style={styles.subtitulo}>
          Atualize as informações da conta selecionada
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
          value={nomeUsuario}
          onChangeText={setNomeUsuario}
          autoCapitalize="none"
        />

        {mensagem ? (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.botaoSalvar,
            carregando && styles.botaoDesativado
          ]}
          onPress={salvarAlteracoes}
          disabled={carregando}
        >
          <Text style={styles.textoBotaoSalvar}>
            {carregando ? 'Salvando...' : 'Salvar alterações'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => setConfirmarExclusao(true)}
          disabled={carregando}
        >
          <Text style={styles.textoBotaoExcluir}>
            Excluir invocador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={aoVoltar}
        >
          <Text style={styles.textoVoltar}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={confirmarExclusao}
        animationType="fade"
      >
        <View style={styles.fundoModal}>
          <View style={styles.modal}>
            <Text style={styles.modalLogo}>
              LEAGUE OF WIKIS
            </Text>

            <Text style={styles.modalTitulo}>
              Excluir invocador?
            </Text>

            <Text style={styles.modalTexto}>
              Esta ação não poderá ser desfeita.
            </Text>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={confirmarExcluir}
            >
              <Text style={styles.textoBotaoExcluir}>
                Sim, excluir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => setConfirmarExclusao(false)}
            >
              <Text style={styles.textoVoltar}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    maxWidth: 500,
    backgroundColor: '#0a1428',
    padding: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#463714'
  },

  logo: {
    color: '#c89b3c',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 9
  },

  titulo: {
    color: '#f0e6d2',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },

  subtitulo: {
    color: '#a09b8c',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 24
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
    color: '#c8aa6e',
    textAlign: 'center',
    marginBottom: 14
  },

  botaoSalvar: {
    backgroundColor: '#c89b3c',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8
  },

  botaoExcluir: {
    backgroundColor: '#411818',
    borderWidth: 1,
    borderColor: '#c0392b',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12
  },

  botaoVoltar: {
    marginTop: 18,
    alignItems: 'center'
  },

  botaoCancelar: {
    marginTop: 14,
    alignItems: 'center'
  },

  textoBotaoSalvar: {
    color: '#091428',
    fontWeight: 'bold',
    fontSize: 16
  },

  textoBotaoExcluir: {
    color: '#ff8c82',
    fontWeight: 'bold',
    fontSize: 16
  },

  textoVoltar: {
    color: '#0ac8b9',
    fontSize: 15,
    fontWeight: 'bold'
  },

  botaoDesativado: {
    opacity: 0.6
  },

  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  modal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#0a1428',
    padding: 26,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#463714'
  },

  modalLogo: {
    color: '#c89b3c',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 10
  },

  modalTitulo: {
    color: '#f0e6d2',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },

  modalTexto: {
    color: '#a09b8c',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 16
  }
})