from flask import Blueprint, jsonify, request, g
from flasgger import swag_from
from middleware.auth import require_auth
from services.project_service import create_project, get_projects, get_project_by_id

projects_bp = Blueprint("projects", __name__)

REQUIRED_CREATE_FIELDS = [
    "name", "description", "budgetCeiling", "currency",
    "projectType", "startDate", "endDate",
]


@projects_bp.route("/api/projects", methods=["POST"])
@require_auth
@swag_from("../docs/projects_create.yml")
def create(project_id=None):
    body = request.get_json(silent=True) or {}

    missing = [f for f in REQUIRED_CREATE_FIELDS if not body.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    try:
        project = create_project(g.user_id, body)
        return jsonify({"data": project}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@projects_bp.route("/api/projects", methods=["GET"])
@require_auth
@swag_from("../docs/projects_list.yml")
def list_projects():
    try:
        projects = get_projects(g.user_id)
        return jsonify({"data": projects, "count": len(projects)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@projects_bp.route("/api/projects/<project_id>", methods=["GET"])
@require_auth
@swag_from("../docs/projects_get.yml")
def get_one(project_id):
    try:
        project = get_project_by_id(g.user_id, project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        return jsonify({"data": project}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404
