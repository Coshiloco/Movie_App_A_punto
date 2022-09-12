import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'
import CreateImageValidator from 'App/Validators/CreateImageValidator'
import UpdateImageValidator from 'App/Validators/UpdateImageValidator'
export default class ImagesController {
  public async index({ response }: HttpContextContract) {
    const images = await Image.query()
    return response.ok(images)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateImageValidator)
    const imageobjeto = new Image()
    const imageuno = request.file('image_xl_md')
    const imagedos = request.file('image_lg_sm')
    imageobjeto.imageXlMd = imageuno ? await ResponsiveAttachment.fromFile(imageuno) : null
    imageobjeto.imageLgSm = imagedos ? await ResponsiveAttachment.fromFile(imagedos) : null
    imageobjeto.contentimageid = data.contentimageid
    const images = await Image.create(imageobjeto)
    return response.ok(images)
  }

  public async show({ response, params }: HttpContextContract) {
    const idmanual = params.id
    console.log('idmanual ', idmanual)
    const data = await Image.query().where('id', idmanual)
    return response.ok(data)
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(UpdateImageValidator)
    const idmanual = params.id
    const image = await Image.firstOrFail()
    const imageXlMd = request.file('image_xl_md')
    const imageLgSm = request.file('image_lg_sm')
    image.imageXlMd = imageXlMd ? await ResponsiveAttachment.fromFile(imageXlMd) : null
    image.imageLgSm = imageLgSm ? await ResponsiveAttachment.fromFile(imageLgSm) : null
    // Old file will be removed from the disk as well.
    await image.save()
    const query = await Image.query().where('id', idmanual)
    return response.ok(query)
  }

  public async destroy({}: HttpContextContract) {}
}
