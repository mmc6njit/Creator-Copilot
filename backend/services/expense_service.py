from services.supabase_client import supabase


def _normalize_expense(row):
    """Convert DB snake_case columns to camelCase for the API consumer."""
    if not row:
        return None

    project = row.get("projects")
    project_mini = None
    if project:
        project_mini = {
            "id": project.get("id"),
            "name": project.get("name"),
            "currency": project.get("currency"),
        }

    return {
        "id": row["id"],
        "userId": row.get("user_id"),
        "projectId": row.get("project_id"),
        "name": row.get("name"),
        "amount": float(row.get("amount", 0)),
        "department": row.get("department"),
        "category": row.get("category"),
        "description": row.get("description"),
        "expenseDate": row.get("expense_date"),
        "vendor": row.get("vendor"),
        "receiptUrl": row.get("receipt_url"),
        "createdAt": row.get("created_at"),
        "updatedAt": row.get("updated_at"),
        "project": project_mini,
    }


EXPENSE_SELECT = (
    "id, user_id, project_id, name, amount, department, category, "
    "description, expense_date, vendor, receipt_url, created_at, updated_at, "
    "projects ( id, name, currency )"
)


def create_expense(user_id, project_id, payload):
    row = {
        "user_id": user_id,
        "project_id": project_id,
        "name": payload["name"].strip(),
        "amount": payload["amount"],
        "department": payload["department"],
        "category": (payload.get("category") or "").strip() or None,
        "description": (payload.get("description") or "").strip() or None,
        "expense_date": payload["expenseDate"],
        "vendor": (payload.get("vendor") or "").strip() or None,
        "receipt_url": (payload.get("receiptUrl") or "").strip() or None,
    }

    resp = (
        supabase.table("expenses")
        .insert(row)
        .execute()
    )

    if not resp.data:
        raise Exception("Failed to create expense")

    # Re-fetch with project join so the response includes project info.
    created_id = resp.data[0]["id"]
    return get_expense_by_id(user_id, project_id, created_id)


def get_expenses(user_id, project_id, department=None):
    query = (
        supabase.table("expenses")
        .select(EXPENSE_SELECT)
        .eq("user_id", user_id)
        .eq("project_id", project_id)
        .order("expense_date", desc=True)
        .order("created_at", desc=True)
    )

    if department and department != "all":
        query = query.eq("department", department)

    resp = query.execute()
    return [_normalize_expense(r) for r in (resp.data or [])]


def get_expense_by_id(user_id, project_id, expense_id):
    resp = (
        supabase.table("expenses")
        .select(EXPENSE_SELECT)
        .eq("id", expense_id)
        .eq("user_id", user_id)
        .eq("project_id", project_id)
        .single()
        .execute()
    )
    return _normalize_expense(resp.data)


def update_expense(user_id, project_id, expense_id, payload):
    allowed = {
        "name", "amount", "department", "category",
        "description", "expenseDate", "vendor", "receiptUrl", "projectId",
    }
    camel_to_snake = {
        "expenseDate": "expense_date",
        "receiptUrl": "receipt_url",
        "projectId": "project_id",
    }

    patch = {}
    for key, value in payload.items():
        if key not in allowed:
            continue
        db_key = camel_to_snake.get(key, key)
        if isinstance(value, str):
            value = value.strip() or None
        patch[db_key] = value

    if not patch:
        return get_expense_by_id(user_id, project_id, expense_id)

    resp = (
        supabase.table("expenses")
        .update(patch)
        .eq("id", expense_id)
        .eq("user_id", user_id)
        .execute()
    )

    if not resp.data:
        return None

    final_project_id = patch.get("project_id", project_id)
    return get_expense_by_id(user_id, final_project_id, expense_id)


def delete_expense(user_id, expense_id):
    resp = (
        supabase.table("expenses")
        .delete()
        .eq("id", expense_id)
        .eq("user_id", user_id)
        .execute()
    )
    return bool(resp.data)


def get_budget_summary(user_id, project_id):
    """Return budget ceiling, total spent, and remaining for a project."""
    project_resp = (
        supabase.table("projects")
        .select("budget_ceiling")
        .eq("id", project_id)
        .eq("user_id", user_id)
        .single()
        .execute()
    )

    if not project_resp.data:
        return None

    budget_ceiling = float(project_resp.data["budget_ceiling"])

    expenses_resp = (
        supabase.table("expenses")
        .select("amount")
        .eq("user_id", user_id)
        .eq("project_id", project_id)
        .execute()
    )

    total_spent = sum(float(e["amount"]) for e in (expenses_resp.data or []))
    remaining = budget_ceiling - total_spent

    return {
        "budgetCeiling": budget_ceiling,
        "totalSpent": round(total_spent, 2),
        "remaining": round(remaining, 2),
        "overBudget": remaining < 0,
    }
