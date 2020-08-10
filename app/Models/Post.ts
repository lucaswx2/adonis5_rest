import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { RequestContract } from '@ioc:Adonis/Core/Request'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title:string

  @column()
  public tags:string

  @column()
  public content:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async validatePost (request: RequestContract) {
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
      tags: schema.string(),
    })

    return await request.validate({
      schema: postSchema,
      cacheKey: request.url(),
    })
  }
}
