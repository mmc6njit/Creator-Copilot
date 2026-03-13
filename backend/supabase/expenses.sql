-- Expenses table for Creator Copilot
-- Run in Supabase SQL Editor

create extension if not exists pgcrypto;

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  amount numeric(12,2) not null check (amount > 0),
  department text not null,
  category text,
  description text,
  expense_date date not null,
  vendor text,
  receipt_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists expenses_user_id_idx on public.expenses(user_id);
create index if not exists expenses_project_id_idx on public.expenses(project_id);
create index if not exists expenses_expense_date_idx on public.expenses(expense_date desc);
create index if not exists expenses_department_idx on public.expenses(department);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_expenses_updated_at on public.expenses;
create trigger set_expenses_updated_at
before update on public.expenses
for each row
execute function public.set_updated_at();

alter table public.expenses enable row level security;

-- Select: users can read their own expenses
drop policy if exists "Users can select own expenses" on public.expenses;
create policy "Users can select own expenses"
on public.expenses
for select
to authenticated
using (auth.uid() = user_id);

-- Insert: user_id must match auth.uid(), and project must belong to the same user
drop policy if exists "Users can insert own expenses" on public.expenses;
create policy "Users can insert own expenses"
on public.expenses
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.projects p
    where p.id = project_id
      and p.user_id = auth.uid()
  )
);

-- Update: owners can update only their own expenses, and cannot move it to another user's project
drop policy if exists "Users can update own expenses" on public.expenses;
create policy "Users can update own expenses"
on public.expenses
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.projects p
    where p.id = project_id
      and p.user_id = auth.uid()
  )
);

-- Delete: owners can delete only their own expenses
drop policy if exists "Users can delete own expenses" on public.expenses;
create policy "Users can delete own expenses"
on public.expenses
for delete
to authenticated
using (auth.uid() = user_id);
