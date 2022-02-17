export const swaggerJson = () => ({
  openapi: '3.0.0',
  info: {
    description: 'URL Scraper API Docs',
    version: '1.0.5',
    title: 'URL Scraper API Docs',
  },
  servers: [
    {
      url: '/',
      description: 'Local',
    },
  ],
  tags: [{ name: 'URL Scraper' }],
  paths: {
    '/url': {
      get: {
        tags: ['URL Scraper'],
        summary: 'Get Images and videos list',
        description: '',
        responses: {
          '200': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/responses/general',
                  },
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      post: {
        tags: ['URL Scraper'],
        summary: 'Add Images and videos list',
        requestBody: {
          description: "Request body example",
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/urlsRequest',
              },
              
              examples: {
                example1: {
                  type: 'object',
                  properties: {
                    urls: {
                      description: 'List of url',
                      type: 'array',
                      example:  [
                        "http://www-db.deis.unibo.it/courses/TW/DOCS/w3schools/tags/tryit.asp-filename=tryhtml5_video.html",
                        "https://www.computerhope.com/jargon/h/html-video-tag.htm"
                      ],
                      items: {
                        type: 'string',
                      }
                    }
                  }
                  
                }
              }
            },
          },
        },
        responses: {
          '201': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/responses/general',
                },
                examples: [
                  {
                    message: 'Url scrpaing is done'
                  }
                ]
              },
            },
          },
        },
        security: [
          {
            basicAuth: [],
          },
        ],
      },
    },
  },
  components: {
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    responses: {
      general: {
        type: 'object',
        properties: {
          message: {
            $ref: '#/components/createdResponse',
          },
        },
      },
    },
    createdResponse: {
      message: {
        type: 'string'
      }
    },
    schemas: {
      urlsRequest: {
        urls: {
          type: 'array',
          items: {
            type: 'string'
          },
        }
      },
    },
  },
});
