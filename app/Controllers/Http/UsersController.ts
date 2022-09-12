import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserAuthValidator from 'App/Validators/CreateUserAuthValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(CreateUserAuthValidator)
    console.log(data)
    // create a user record with the validated data
    const user = await User.create(data)

    // login the user using the user model record
    const token = await auth.login(user)

    user.remember_me_token = token
    // redirect to the login page
    return response.ok(user)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async login({ auth, request, response }: HttpContextContract) {
    // grab uid and password values off request body
    await request.validate(CreateUserAuthValidator)
    const { email, password } = request.only(['email', 'password'])
    console.log('uid ', email)
    // attempt to login
    const data = await auth.attempt(email, password)
    // otherwise, redirect to home page
    return response.ok(data)
  }
}
