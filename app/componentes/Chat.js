import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'

import { perguntarIa } from '../servicos/ia'

export default function Chat() {
  const [pergunta, setPergunta] = useState('')
  const [mensagens, setMensagens] = useState([])
  const [carregando, setCarregando] = useState(false)

  async function enviarPergunta() {
    const texto = pergunta.trim()

    if (!texto || carregando) {
      return
    }

    setMensagens((anteriores) => [
      ...anteriores,
      {
        tipo: 'usuario',
        texto
      }
    ])

    setPergunta('')
    setCarregando(true)

    try {
      const dados = await perguntarIa(texto)

      setMensagens((anteriores) => [
        ...anteriores,
        {
          tipo: 'ia',
          texto: dados.resposta,
          tokens: dados.tokens
        }
      ])
    } catch (erro) {
      setMensagens((anteriores) => [
        ...anteriores,
        {
          tipo: 'erro',
          texto: erro.message
        }
      ])
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Oráculo de Runeterra
        </Text>

        <Text style={styles.subtitulo}>
          Pergunte sobre campeões, habilidades, skins e runas
        </Text>
      </View>

      <ScrollView style={styles.conversa}>
        {mensagens.map((mensagem, index) => (
          <View
            key={index}
            style={[
              styles.balao,
              mensagem.tipo === 'usuario'
                ? styles.balaoUsuario
                : styles.balaoIa
            ]}
          >
            <Text
              style={[
                styles.textoMensagem,
                mensagem.tipo === 'erro' && styles.textoErro
              ]}
            >
              {mensagem.texto}
            </Text>

            {mensagem.tipo === 'ia' && (
              <Text style={styles.tokens}>
                Tokens utilizados: {mensagem.tokens}
              </Text>
            )}
          </View>
        ))}

        {carregando && (
          <View style={[styles.balao, styles.balaoIa]}>
            <Text style={styles.textoPensando}>
              Consultando os arquivos de Runeterra...
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.areaEnvio}>
        <TextInput
          style={styles.input}
          placeholder="Pergunte algo sobre League of Legends..."
          placeholderTextColor="#7f8c8d"
          value={pergunta}
          onChangeText={setPergunta}
          editable={!carregando}
          onSubmitEditing={enviarPergunta}
        />

        <TouchableOpacity
          style={[
            styles.botao,
            carregando && styles.botaoDesabilitado
          ]}
          onPress={enviarPergunta}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            Consultar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    width: '100%',
    backgroundColor: '#07111f',
    borderWidth: 1,
    borderColor: '#463714',
    borderRadius: 8,
    padding: 18
  },

  cabecalho: {
    marginBottom: 16
  },

  titulo: {
    color: '#c89b3c',
    fontSize: 22,
    fontWeight: 'bold'
  },

  subtitulo: {
    color: '#a09b8c',
    fontSize: 13,
    marginTop: 4
  },

  conversa: {
    maxHeight: 360,
    marginBottom: 15
  },

  balao: {
    padding: 13,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '82%',
    borderWidth: 1
  },

  balaoUsuario: {
    backgroundColor: '#0a323c',
    borderColor: '#0ac8b9',
    alignSelf: 'flex-end'
  },

  balaoIa: {
    backgroundColor: '#0a1428',
    borderColor: '#463714',
    alignSelf: 'flex-start'
  },

  textoMensagem: {
    color: '#f0e6d2',
    fontSize: 15,
    lineHeight: 21
  },

  textoPensando: {
    color: '#c8aa6e',
    fontSize: 14,
    fontStyle: 'italic'
  },

  textoErro: {
    color: '#ff6b6b'
  },

  tokens: {
    color: '#785a28',
    fontSize: 11,
    marginTop: 7
  },

  areaEnvio: {
    flexDirection: 'row',
    gap: 10
  },

  input: {
    flex: 1,
    backgroundColor: '#0a1428',
    color: '#f0e6d2',
    borderWidth: 1,
    borderColor: '#1e3a4c',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 6
  },

  botao: {
    backgroundColor: '#c89b3c',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 6
  },

  botaoDesabilitado: {
    opacity: 0.5
  },

  textoBotao: {
    color: '#091428',
    fontWeight: 'bold'
  }
})