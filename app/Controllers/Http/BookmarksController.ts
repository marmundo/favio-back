import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookMark from 'App/Models/BookMark'
import { DateTime } from 'luxon'

export default class BookmarksController {
  public async index({}: HttpContextContract) {
    return BookMark.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    const newFavorito = { nome, url, importante }
    BookMark.create(newFavorito)
    return response.status(201).send(newFavorito)
  }

  public async show({ params }: HttpContextContract) {
    // eslint-disable-next-line eqeqeq

    let favoritoEncontrado = await BookMark.findByOrFail('id', params.id)
    if (favoritoEncontrado === undefined) return { msg: 'favorito nao encontrado' }
    return favoritoEncontrado
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    // eslint-disable-next-line eqeqeq
    let favoritoEncontrado = await BookMark.findByOrFail('id', params.id)
    if (!favoritoEncontrado) {
      return response.status(404).json({ error: 'Favorite not found' })
    }

    favoritoEncontrado.nome = nome
    favoritoEncontrado.url = url
    favoritoEncontrado.importante = importante
    await favoritoEncontrado.save()
    await favoritoEncontrado.merge({ updatedAt: DateTime.local() }).save()

    return response.status(201).json(favoritoEncontrado)
  }

  public async destroy({ params, response }: HttpContextContract) {
    // eslint-disable-next-line eqeqeq
    const favorito = await BookMark.findByOrFail('id', params.id)
    await favorito.delete()
    if (!favorito) {
      return response.status(404).json({ error: 'Favorite not found' })
    }

    return response.status(204)
  }
}
