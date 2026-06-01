export type TodoFilter = 'all' | 'active' | 'completed'

export interface TodoUiState {
  filter: TodoFilter
  keyword: string
  editingId: number | null
  draftText: string
  message: string
}

type TodoUiAction =
  | { type: 'SET_FILTER'; payload: TodoFilter }
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'SET_EDIT'; payload: { id: number; text: string } }
  | { type: 'SET_MESSAGE'; payload: string }

export const todoUiInitialState: TodoUiState = {
  filter: 'all',
  keyword: '',
  editingId: null,
  draftText: '',
  message: '',
}

export function todoUiReducer(
  state: TodoUiState,
  action: TodoUiAction
): TodoUiState {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }

    case 'SET_KEYWORD':
      return {
        ...state,
        keyword: action.payload,
      }

    case 'SET_EDIT':
      return {
        ...state,
        editingId: action.payload.id,
        draftText: action.payload.text,
        message: '',
      }

    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      }

    default:
      return state
  }
}
