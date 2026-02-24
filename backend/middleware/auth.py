from functools import wraps
from flask import request, jsonify, g
from services.supabase_client import supabase


def require_auth(f):
    """
    Flask route decorator that verifies the caller is a logged-in Supabase user.

    Expects an Authorization header:  Bearer <supabase_access_token>

    On success, sets:
        g.user      – full Supabase user object
        g.user_id   – shortcut to the user's UUID (str)

    On failure, returns 401 JSON response.
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or malformed Authorization header"}), 401

        token = auth_header.split("Bearer ")[1].strip()

        if not token:
            return jsonify({"error": "Empty token"}), 401

        try:
            # Validate the token against Supabase Auth.
            # This handles all algorithms (HS256, ECC) and catches revoked tokens.
            user_response = supabase.auth.get_user(token)
            user = user_response.user

            if user is None:
                return jsonify({"error": "Invalid or expired token"}), 401

            # Attach user info to Flask's request-scoped globals.
            g.user = user
            g.user_id = user.id

        except Exception as e:
            return jsonify({"error": "Authentication failed", "detail": str(e)}), 401

        return f(*args, **kwargs)

    return decorated

