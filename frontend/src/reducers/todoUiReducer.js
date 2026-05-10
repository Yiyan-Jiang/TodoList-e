// 使用useReducer 统一管理UI状态

export const todoUiInitialState = {
  filter: 'all',
  keyword: '',
  editingId: null,
  draftText:'',
  message:'', // 提示消息
}

export function todoUiReducer(state,action){
  switch(action.type){
    case 'SET_FILTER':
      return{
        ...state,
        filter:action.payload,
      }
    
    case 'SET_KEYWORD':
      return {
        ...state,
        keyword:action.payload,
      }
    
      case 'SET_EDIT':
        return {
          ...state,
          editingId:action.payload.id,
          draftText:action.payload.text,
          message:'',
        }
      
      case 'SET_MESSAGE':
        return {
          ...state,
          message:action.payload
        }
      
      default:
        return state
  }
}