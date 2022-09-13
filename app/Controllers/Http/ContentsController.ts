import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import CreateContentValidator from 'App/Validators/CreateContentValidator'
import SortContentValidator from 'App/Validators/SortContentValidator'
import UpdateContentValidator from 'App/Validators/UpdateContentValidator'

export default class ContentsController {
  public async index({ response, request }: HttpContextContract) {
    const title = request.input('title') ?? null
    const year = request.input('year') ?? null
    const rating = request.input('rating') ?? null
    const category = request.input('category') ?? null
    const isRecent = request.input('is_recent') ?? null
    const isTrending = request.input('is_trending') ?? null
    const validatedData = await request.validate(SortContentValidator)
    const sort = validatedData.sort || 'id'
    const order = validatedData.order || 'asc'
    const content = await Content.query()
      .if(title, (query) => query.where('title', 'like', `%${title}%`))
      .if(year, (query) => query.where('year', '=', year))
      .if(rating, (query) => query.where('price', '>=', rating))
      .if(category, (query) => query.where('category', category))
      .if(isRecent, (query) => query.where('is_recent', isRecent))
      .if(isTrending, (query) => query.where('is_trending', isTrending))
      .orderBy(sort, order)
      .preload('images')
    return response.ok(content)
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateContentValidator)
    const content = await Content.create(data)
    response.ok(content)
  }

  public async show({ response, params }: HttpContextContract) {
    const idmanual = params.id
    console.log('idmanual ', idmanual)
    const data = await Content.query().where('id', idmanual).preload('images')
    return response.ok(data)
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, response, params }: HttpContextContract) {
    const idcontent = params.id
    const data = await request.validate(UpdateContentValidator)
    await Content.query().where('id', idcontent).update(data)
    response.ok(data)
  }

  public async destroy({}: HttpContextContract) {}

  public async withdescription({ response }: HttpContextContract) {
    const withDescription = await Content.query().whereNotNull('description')
    console.log(withDescription)
    return response.ok(withDescription)
  }
}
