from flask import Blueprint, jsonify, request, g
from flasgger import swag_from
from middleware.auth import require_auth
from services.expense_service import (
    create_expense,
    get_expenses,
    get_expense_by_id,
    update_expense,
    delete_expense,
    get_budget_summary,
)

expenses_bp = Blueprint("expenses", __name__)

REQUIRED_CREATE_FIELDS = ["name", "amount", "department", "expenseDate"]


@expenses_bp.route("/api/projects/<project_id>/expenses", methods=["POST"])
@require_auth
@swag_from("../docs/expenses_create.yml")
def create(project_id):
    body = request.get_json(silent=True) or {}

    missing = [f for f in REQUIRED_CREATE_FIELDS if not body.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    if not isinstance(body["amount"], (int, float)) or body["amount"] <= 0:
        return jsonify({"error": "amount must be a positive number"}), 400

    try:
        expense = create_expense(g.user_id, project_id, body)
        return jsonify({"data": expense}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@expenses_bp.route("/api/projects/<project_id>/expenses", methods=["GET"])
@require_auth
@swag_from("../docs/expenses_list.yml")
def list_expenses(project_id):
    department = request.args.get("department")

    try:
        expenses = get_expenses(g.user_id, project_id, department=department)
        return jsonify({"data": expenses, "count": len(expenses)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@expenses_bp.route("/api/projects/<project_id>/expenses/<expense_id>", methods=["GET"])
@require_auth
@swag_from("../docs/expenses_get.yml")
def get_one(project_id, expense_id):
    try:
        expense = get_expense_by_id(g.user_id, project_id, expense_id)
        if not expense:
            return jsonify({"error": "Expense not found"}), 404
        return jsonify({"data": expense}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404


@expenses_bp.route("/api/projects/<project_id>/expenses/<expense_id>", methods=["PUT"])
@require_auth
@swag_from("../docs/expenses_update.yml")
def update(project_id, expense_id):
    body = request.get_json(silent=True) or {}

    if "amount" in body:
        if not isinstance(body["amount"], (int, float)) or body["amount"] <= 0:
            return jsonify({"error": "amount must be a positive number"}), 400

    try:
        expense = update_expense(g.user_id, project_id, expense_id, body)
        if not expense:
            return jsonify({"error": "Expense not found"}), 404
        return jsonify({"data": expense}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@expenses_bp.route("/api/projects/<project_id>/expenses/<expense_id>", methods=["DELETE"])
@require_auth
@swag_from("../docs/expenses_delete.yml")
def delete(project_id, expense_id):
    try:
        deleted = delete_expense(g.user_id, expense_id)
        if not deleted:
            return jsonify({"error": "Expense not found"}), 404
        return jsonify({"message": "Expense deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@expenses_bp.route("/api/projects/<project_id>/budget-summary", methods=["GET"])
@require_auth
@swag_from("../docs/budget_summary.yml")
def budget_summary(project_id):
    try:
        summary = get_budget_summary(g.user_id, project_id)
        if not summary:
            return jsonify({"error": "Project not found"}), 404
        return jsonify({"data": summary}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
