import Post from 'App/Models/Post'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  public async index () {
    const posts = await Post.all()
    return posts
  }

  public async store ({ request }: HttpContextContract) {
    const data = await this.validatePost(request)

    const post = new Post()

    post.title = data.title
    post.content = data.content

    await post.save()
    return post
  }

  public async show ({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return post
  }

  public async update ({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const data = await this.validatePost(request)

    post.title = data.title
    await post.save()

    return post
  }

  public async destroy ({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    post.delete()
  }

  public async validatePost (request: RequestContract) {
    const postSchema = schema.create({
      title: schema.string(
        {
          escape: true,
          trim: true,
        },
        [rules.required()]
      ),
      content: schema.string(
        {
          escape: true,
        },
        [rules.required()]
      ),
    })

    return await request.validate({
      schema: postSchema,
      cacheKey: request.url(),
    })
  }
}
