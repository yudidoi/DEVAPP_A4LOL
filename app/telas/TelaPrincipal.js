import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'

import Chat from '../componentes/Chat'

export default function TelaPrincipal({
  usuario,
  aoAbrirUsuarios,
  aoSair
}) {
  return (
    <ScrollView
      style={styles.pagina}
      contentContainerStyle={styles.container}
    >
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.subtituloTopo}>
            LEAGUE OF WIKIS
          </Text>

          <Text style={styles.titulo}>
            Universo de League of Legends
          </Text>

          <Text style={styles.saudacao}>
            Olá, {usuario?.nome || 'Invocador'}
          </Text>
        </View>

        <View style={styles.botoesCabecalho}>
          <TouchableOpacity
            style={styles.botaoUsuarios}
            onPress={aoAbrirUsuarios}
          >
            <Text style={styles.textoBotaoDourado}>
              Ver usuários
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSair}
            onPress={aoSair}
          >
            <Text style={styles.textoBotao}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.cardIntroducao}>
          <Text style={styles.tituloCard}>
            Bem-vindo, Invocador
          </Text>

          <Text style={styles.textoCard}>
            Explore informações sobre campeões, habilidades,
            skins, runas e outros conteúdos do universo de
            League of Legends.
          </Text>
        </View>

        <View style={styles.secaoCards}>
          <View style={styles.cardInfo}>
            <Text style={styles.iconeCard}>⚔</Text>

            <Text style={styles.tituloInfo}>
              Campeões
            </Text>

            <Text style={styles.textoInfo}>
              Descubra informações sobre campeões,
              funções e habilidades.
            </Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.iconeCard}>✦</Text>

            <Text style={styles.tituloInfo}>
              Skins
            </Text>

            <Text style={styles.textoInfo}>
              Consulte skins e conteúdos cosméticos
              presentes no catálogo.
            </Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.iconeCard}>◆</Text>

            <Text style={styles.tituloInfo}>
              Runas
            </Text>

            <Text style={styles.textoInfo}>
              Conheça runas e possibilidades para
              diferentes estilos de jogo.
            </Text>
          </View>
        </View>

        <View style={styles.areaAssistente}>
          <View style={styles.cabecalhoAssistente}>
            <Text style={styles.tituloAssistente}>
              Oráculo de Runeterra
            </Text>

            <Text style={styles.textoAssistente}>
              Pergunte ao assistente sobre o conteúdo
              disponível na League of Wikis.
            </Text>
          </View>

          <Chat />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: '#07111f'
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 30
  },

  cabecalho: {
    width: '100%',
    maxWidth: 1050,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: 20
  },

  subtituloTopo: {
    color: '#c89b3c',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 6
  },

  titulo: {
    color: '#f0e6d2',
    fontSize: 32,
    fontWeight: 'bold'
  },

  saudacao: {
    color: '#a09b8c',
    fontSize: 17,
    marginTop: 7
  },

  botoesCabecalho: {
    flexDirection: 'row',
    gap: 10
  },

  botaoUsuarios: {
    borderWidth: 1,
    borderColor: '#c89b3c',
    backgroundColor: '#091428',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 6
  },

  botaoSair: {
    backgroundColor: '#1e282d',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 6
  },

  textoBotaoDourado: {
    color: '#c89b3c',
    fontWeight: 'bold'
  },

  textoBotao: {
    color: '#f0e6d2',
    fontWeight: 'bold'
  },

  conteudo: {
    width: '100%',
    maxWidth: 1050,
    alignItems: 'center'
  },

  cardIntroducao: {
    width: '100%',
    backgroundColor: '#0a1428',
    borderWidth: 1,
    borderColor: '#463714',
    borderRadius: 8,
    padding: 25,
    marginBottom: 22
  },

  tituloCard: {
    color: '#c89b3c',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },

  textoCard: {
    color: '#c8aa6e',
    fontSize: 15,
    lineHeight: 23
  },

  secaoCards: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 25
  },

  cardInfo: {
    flexGrow: 1,
    flexBasis: 220,
    backgroundColor: '#0a1428',
    borderWidth: 1,
    borderColor: '#1e3a4c',
    borderRadius: 8,
    padding: 20,
    minHeight: 160
  },

  iconeCard: {
    color: '#c89b3c',
    fontSize: 26,
    marginBottom: 10
  },

  tituloInfo: {
    color: '#f0e6d2',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 7
  },

  textoInfo: {
    color: '#a09b8c',
    fontSize: 14,
    lineHeight: 21
  },

  areaAssistente: {
    width: '100%',
    backgroundColor: '#091428',
    borderWidth: 1,
    borderColor: '#463714',
    borderRadius: 8,
    padding: 18
  },

  cabecalhoAssistente: {
    marginBottom: 5
  },

  tituloAssistente: {
    color: '#c89b3c',
    fontSize: 23,
    fontWeight: 'bold'
  },

  textoAssistente: {
    color: '#a09b8c',
    fontSize: 14,
    marginTop: 5
  }
})