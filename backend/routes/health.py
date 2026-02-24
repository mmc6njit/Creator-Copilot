from flask import Blueprint, jsonify, g
from flasgger import swag_from
from middleware.auth import require_auth

health_bp = Blueprint("health", __name__)


@health_bp.route("/api/health", methods=["GET"])
@swag_from("../docs/health.yml")
def health_check():
    """Public endpoint — no auth required. Use to verify the server is running."""
    return jsonify({"status": "ok"}), 200


@health_bp.route("/api/health/protected", methods=["GET"])
@require_auth
@swag_from("../docs/health_protected.yml")
def protected_health_check():
    """Protected endpoint — requires a valid Supabase access token."""
    return jsonify({
        "status": "ok",
        "user_id": g.user_id,
        "email": g.user.email,
    }), 200
