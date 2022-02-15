  import {CatalogApi} from '../../services/api.service'

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

    const newBooks = state.books.filter(x => x._id !== state.idToDelete)
    return {...state, books: newBooks, action: 'deleted', statusOk: true, task: state.task ? false : true};
  }
  
  export const reducer = (state, action) =>{
    console.log('llegamos');
    const whatToReturn = {
      "SET_DELETE": set_delete,
      "DELETE": _delete,
      "FIRST_OK": first,
      "FITST_FAIL": first_fail,
      "CREATE": create
    }
  
    console.log(55, whatToReturn[action.type](state, action));
    return  whatToReturn[action.type](state, action)
  }
  