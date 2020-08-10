import Post from 'App/Models/Post'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
  public async index () {
    const posts = await Post.all()
    return posts
  }

  public async store ({ request }: HttpContextContract) {
    const data = await Post.validatePost(request)

    const post = new Post()

    post.title = data.title
    post.content = data.content
    post.tags = data.tags

    await post.save()
    return post
  }

  public async show ({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return post
  }

  public async update ({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const data = await Post.validatePost(request)

    post.title = data.title
    await post.save()

    return post
  }

  public async destroy ({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    post.delete()
  }
}
