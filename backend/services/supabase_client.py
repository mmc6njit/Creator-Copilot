from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_SECRET_KEY

if not SUPABASE_URL or not SUPABASE_SECRET_KEY:
    raise RuntimeError(
        "Missing SUPABASE_URL or SUPABASE_SECRET_KEY. "
        "Make sure your backend/.env file is configured."
    )

# Server-side client using the secret (service_role) key.
# This bypasses RLS — your middleware + route logic handle authorization.
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)

