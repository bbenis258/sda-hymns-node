const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kinyarwanda SDA Hymns',
            description: "API endpoints for Kinyarwanda SDA Hymns",
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: "Benis Abimana",
                email: "bbenis258@gmail.com",
                url: "https://github.com/bbenis258/sda-hymns-node"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:15500/",
                description: "Local server"
            },
            {
                url: "<your live url here>",
                description: "Live server"
            },
        ]
    },
    apis: ['./router/*.js'],
}
const swaggerSpec = swaggerJsdoc(options)
const SwaggerDocs = function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
module.exports = SwaggerDocs;
