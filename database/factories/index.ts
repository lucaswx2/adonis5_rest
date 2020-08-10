import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'

export const PostFactory = Factory.define(Post,({faker}) =>{
  return {
    title: faker.lorem.words(7),
    content: faker.lorem.paragraphs(),
    tags: faker.lorem.words(6).split(' ').join(','),
  }
}).build()

