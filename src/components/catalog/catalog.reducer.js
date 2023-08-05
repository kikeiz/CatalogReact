  // import {CatalogApi} from '../../services/api.service'

  const create = (state, action) => {
    return {...state, books: [...state.books, action.payload], action: 'added', statusOk: action.statusOk, task: state.task ? false : true}
  }

  const first_fail = (state, action) =>{
    return {...state,  action: 'retrieved', statusOk: false, task: state.task ? false : true}
  }
  
  const first = (state, action) =>{
    return {...state, books: action.payload, action: false}
  }
  
  const set_delete = (state, action) =>{
    return {...state, idToDelete: action.id}
  }
  
  const _delete = (state, action) =>{  
    if(action.error)
      return {...state,  action: 'deleted', statusOk: false, task: state.task ? false : true};

    const newBooks = state.books.filter(x => x.bookId !== state.idToDelete)
    return {...state, books: newBooks, action: 'deleted', statusOk: true, task: state.task ? false : true};
  }
  
  export const reducer = (state, action) =>{
    if(action.type === "SET_DELETE"){
      return set_delete(state, action)
    }
    if(action.type === "DELETE"){
      return _delete(state, action)
    }
    
    if(action.type === "FIRST_OK"){
      return first(state, action)
    }

    if(action.type === "FITST_FAIL"){
      return first_fail(state, action)
    }

    return create(state, action)
  }
  