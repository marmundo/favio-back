import { test } from '@japa/runner'

test.group('Favoritos adiciona favorito', () => {
  test('adiciona favorito', async ({ client }) => {
    const response = await client.post('/favoritos').json({
      nome: 'IFRN',
      url: 'http://www.ifrn.edu.br',
      importante: true,
    })

    response.assertStatus(201)
    response.assertBodyContains({ nome: 'IFRN' })
  })
})

test.group('BookMark adiciona Bookmark', () => {
  test('adiciona Bookmark', async ({ client }) => {
    const response = await client.post('/bookmarks').json({
      nome: 'IFRN',
      url: 'http://www.ifrn.edu.br',
      importante: true,
    })

    response.assertStatus(201)
    response.assertBodyContains({ nome: 'IFRN' })
  })
})
