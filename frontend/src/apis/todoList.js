import client from './client';

export const read_todos = () => client.get('/todos');

export const create_new_todo = (data) => client.post('/todos',data) ;

export const search_todos = (search_str) => client.get(`/todos/search?search_str=${search_str}`) ;

export const update_existing_todo = (todo_id, data) => client.put(`/todos/${todo_id}`,data) ;

export const delete_existing_todo = (todo_id) => client.delete(`/todos/${todo_id}`) ;