from flasgger import Swagger

SWAGGER_TEMPLATE = {
    "swagger": "2.0",
    "info": {
        "title": "Creator Copilot API",
        "description": "Backend API for Creator Copilot — project management and AI tools for creators.",
        "version": "1.0.0",
        "contact": {
            "name": "Creator Copilot Team",
        },
    },
    "host": "localhost:5001",
    "basePath": "/",
    "schemes": ["http"],
    "securityDefinitions": {
        "BearerAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Supabase access token. Format: **Bearer &lt;access_token&gt;**",
        }
    },
}

SWAGGER_CONFIG = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec",
            "route": "/apispec.json",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/docs",
}


def init_swagger(app):
    """Attach Swagger/OpenAPI docs to the Flask app.

    Interactive UI available at:  http://localhost:5001/docs
    Raw JSON spec at:             http://localhost:5001/apispec.json
    """
    return Swagger(app, template=SWAGGER_TEMPLATE, config=SWAGGER_CONFIG)

