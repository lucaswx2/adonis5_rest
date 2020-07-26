import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')

Route.post('/users','UsersController.store')

Route.resource('posts','PostsController').apiOnly().middleware({
  store:[ 'auth'],
  update:[ 'auth'],
  destroy:[ 'auth'],
})

