create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  module text not null,
  time_text text,
  priority text default '中',
  reminder text default '待设置',
  done boolean default false,
  overdue boolean default false,
  source text default 'manual',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table tasks enable row level security;

drop policy if exists "用户只能查看自己的任务" on tasks;
drop policy if exists "用户只能新增自己的任务" on tasks;
drop policy if exists "用户只能修改自己的任务" on tasks;
drop policy if exists "用户只能删除自己的任务" on tasks;

create policy "用户只能查看自己的任务"
on tasks
for select
using (auth.uid() = user_id);

create policy "用户只能新增自己的任务"
on tasks
for insert
with check (auth.uid() = user_id);

create policy "用户只能修改自己的任务"
on tasks
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "用户只能删除自己的任务"
on tasks
for delete
using (auth.uid() = user_id);
