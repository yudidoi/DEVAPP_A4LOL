import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native'

import { listarUsuarios } from '../servicos/api'

export default function TelaUsuarios({
  token,
  aoVoltar,
  aoEditar,
  aoSessaoExpirada
}) {
  const [usuarios, setUsuarios] = useState([])
  const [busca, setBusca] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarUsuarios()
  }, [])

  async function carregarUsuarios() {
    try {
      setCarregando(true)
      setMensagem('')

      const resposta = await listarUsuarios(token)

      setUsuarios(resposta.dados)
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

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nomeCompleto =
      `${usuario.nome} ${usuario.sobrenome}`.toLowerCase()

    return nomeCompleto.includes(busca.toLowerCase())
  })

  function renderizarUsuario({ item }) {
    return (
      <TouchableOpacity
        style={styles.cartao}
        onPress={() => aoEditar(item)}
      >
        <Text style={styles.nome}>
          {item.nome} {item.sobrenome}
        </Text>

        <Text style={styles.dado}>
          {item.email}
        </Text>

        <Text style={styles.dado}>
          Invocador: @{item.usuario}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={aoVoltar}
        >
          <Text style={styles.textoBotaoVoltar}>
            Voltar
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.logo}>
            LEAGUE OF WIKIS
          </Text>

          <Text style={styles.titulo}>
            Invocadores cadastrados
          </Text>
        </View>
      </View>

      <View style={styles.conteudo}>
        <TextInput
          style={styles.input}
          placeholder="Buscar invocador por nome..."
          placeholderTextColor="#7f8c8d"
          value={busca}
          onChangeText={setBusca}
        />

        {mensagem ? (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        ) : null}

        {carregando ? (
          <Text style={styles.informacao}>
            Carregando invocadores...
          </Text>
        ) : (
          <FlatList
            data={usuariosFiltrados}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderizarUsuario}
            contentContainerStyle={styles.lista}
            ListEmptyComponent={
              <Text style={styles.informacao}>
                Nenhum invocador encontrado.
              </Text>
            }
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111f'
  },

  topo: {
    backgroundColor: '#0a1428',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#463714'
  },

  botaoVoltar: {
    backgroundColor: '#091428',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#c89b3c'
  },

  textoBotaoVoltar: {
    color: '#c89b3c',
    fontWeight: 'bold'
  },

  logo: {
    color: '#c89b3c',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 4
  },

  titulo: {
    color: '#f0e6d2',
    fontSize: 24,
    fontWeight: 'bold'
  },

  conteudo: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    padding: 20
  },

  input: {
    backgroundColor: '#091428',
    color: '#f0e6d2',
    padding: 14,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e3a4c'
  },

  lista: {
    paddingBottom: 30
  },

  cartao: {
    backgroundColor: '#0a1428',
    padding: 18,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#463714'
  },

  nome: {
    color: '#f0e6d2',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6
  },

  dado: {
    color: '#a09b8c',
    fontSize: 14,
    marginTop: 2
  },

  mensagem: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 15
  },

  informacao: {
    color: '#a09b8c',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16
  }
})