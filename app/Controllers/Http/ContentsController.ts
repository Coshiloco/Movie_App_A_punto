import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import CreateContentValidator from 'App/Validators/CreateContentValidator'
import UpdateContentValidator from 'App/Validators/UpdateContentValidator'

export default class ContentsController {
  public async index({ response }: HttpContextContract) {
    const projects = await Content.query()
    return response.ok(projects)
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
