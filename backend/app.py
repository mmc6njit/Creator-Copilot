from flask import Flask
from flask_cors import CORS
from docs.swagger import init_swagger
from routes.health import health_bp


def create_app():
    app = Flask(__name__)

    # Allow requests from the Vite dev server and any future frontend origin.
    CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

    # --- Swagger / OpenAPI docs (http://localhost:5001/docs) ---
    init_swagger(app)

    # --- Register route blueprints ---
    app.register_blueprint(health_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)

