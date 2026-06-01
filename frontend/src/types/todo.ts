export interface Todo {
  id: number
  todo: string
  completed: boolean
}

export interface OptimisticTodo extends Todo {
  pending?: boolean
}

export interface TodoCreatePayload {
  todo: string
  completed?: boolean
}

export interface TodoUpdatePayload {
  todo?: string
  completed?: boolean
}

export interface TodoState {
  items: Todo[]
  loading: boolean
  error: string | null
}
