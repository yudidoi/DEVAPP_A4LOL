const API_IA = 'https://api-ia-lol.vercel.app'

export async function perguntarIa(pergunta) {
  const resposta = await fetch(`${API_IA}/perguntar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pergunta
    })
  })

  const dados = await resposta.json()

  if (!resposta.ok || !dados.sucesso) {
    throw new Error(
      dados.mensagem || 'Não foi possível consultar a IA'
    )
  }

  return dados.dados
}