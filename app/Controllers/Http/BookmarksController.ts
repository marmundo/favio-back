import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const favoritos = [{ id: 1, nome: 'Google', url: 'http://www.google.com', importante: true }]

export default class BookmarksController {
  public async index({}: HttpContextContract) {
    return favoritos
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    const newFavorito = { id: favoritos.length, nome, url, importante }
    favoritos.push(newFavorito)
    return response.status(201).send(newFavorito)
  }

  public async show({ params }: HttpContextContract) {
    // eslint-disable-next-line eqeqeq
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (favoritoEncontrado === undefined) return { msg: 'favorito nao encontrado' }
    return favoritoEncontrado
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    // eslint-disable-next-line eqeqeq
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (!favoritoEncontrado) {
      return response.status(404).json({ error: 'Favorite not found' })
    }

    const index = favoritos.indexOf(favoritoEncontrado)
    favoritos[index] = { id: index, nome, url, importante }
    return response.status(201).json({ id: index, nome, url, importante })
  }

  public async destroy({ params, response }: HttpContextContract) {
    // eslint-disable-next-line eqeqeq
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (!favoritoEncontrado) {
      return response.status(404).json({ error: 'Favorite not found' })
    }

    const index = favoritos.indexOf(favoritoEncontrado)
    favoritos.splice(index, 1)
    return response.status(204)
  }
}
