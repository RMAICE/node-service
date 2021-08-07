export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Affise click migration api doc',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/extensions/*.js'] // files containing annotations as above
}
