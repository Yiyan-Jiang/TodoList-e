import client from './client';
import type { Todo, TodoCreatePayload, TodoUpdatePayload } from '../types/todo'

export const read_todos = () => client.get<Todo[]>('/todos');

export const create_new_todo = (data: TodoCreatePayload) => client.post<Todo>('/todos', data);

export const search_todos = (search_str: string) =>
  client.get<Todo[]>(`/todos/search?search_str=${encodeURIComponent(search_str)}`);

export const update_existing_todo = (todo_id: number, data: TodoUpdatePayload) =>
  client.put<Todo>(`/todos/${todo_id}`, data);

export const delete_existing_todo = (todo_id: number) => client.delete<void>(`/todos/${todo_id}`);
