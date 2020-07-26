import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async store ({ request }: HttpContextContract) {
    const { email, name, password } = await this.validateStoreUser(request)

    const user = new User()
    user.email = email
    user.name = name
    user.password = password
    await user.save()
    return user
  }

  public async validateStoreUser (request: RequestContract) {
    const postSchema = schema.create({
      name: schema.string({ escape: true, trim: true }, [rules.required()]),
      email: schema.string(
        {
          escape: true,
          trim: true,
        },
        [
          rules.required(),
          rules.email(),
          rules.unique({
            table: 'users',
            column: 'email',
          }),
        ]
      ),
      password: schema.string({}, [rules.required()]),
      confirmPassword: schema.string({}, [rules.confirmed('password')]),
    })

    return await request.validate({
      schema: postSchema,
      cacheKey: request.url(),
    })
  }
}
