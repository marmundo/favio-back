import { test } from '@japa/runner'

test.group('Favoritos list', () => {
  test('display favoritos', async ({ client }) => {
    const response = await client.get('/favoritos')

    response.assertStatus(200)
  })

  test('display favoritos by id', async ({ client }) => {
    const response = await client.get('/favoritos/1')

    response.assertStatus(200)
  })
})

test.group('BookMark list', () => {
  test('display bookmarks', async ({ client }) => {
    const response = await client.get('/bookmarks')

    response.assertStatus(200)
  })

  test('display bookmarks by id', async ({ client }) => {
    const response = await client.get('/bookmarks/1')

    response.assertStatus(200)
  })
})
