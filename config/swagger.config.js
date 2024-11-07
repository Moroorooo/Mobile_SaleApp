const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "PRM API with Swagger",
            version: "0.1.0",
            description:
                "This is a PRM API with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;