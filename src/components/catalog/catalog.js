//Importamos React 
import React, { useState, useReducer, useEffect, useRef, useContext } from 'react';
import './catalog.scss'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {CatalogApi} from '../../services/api.service'
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { reducer } from './catalog.reducer';


//LIBRARY


const defaultState = {
    books: [],
    action: null, 
    statusOk: true,
    idToDelete: 0,
    task: false
}

const CatalogContext = React.createContext()

const deleteBook = async (id) =>{
  const deleted = await CatalogApi.deleteBook(id)
  .catch((err)=>{
    console.log(7, err);
  })
  console.log(66, deleted);

}

export const Catalog = () =>{
  const [showForm, setShowForm] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false)
  const toast = useRef(Toast)
  const [state, dispatch] = useReducer(reducer, defaultState)
  
  useEffect(()=>{
    (async function () {
      let books = await CatalogApi.retrieveBooks()
      if(books.length === 0)
        return dispatch({type: 'FIRST_FAIL'})

      dispatch({type: 'FIRST_OK', payload: books})
    })();
  }, [])


  useEffect(()=>{
    if(state.action){
      toast.current?.show(
        {
          severity: state.statusOk ? 'success' : 'warning', 
          summary: 'ADDITION', 
          detail: state.statusOk ? `Book ${state.action} successfully`: `Error ${state.action.slice(0, -2)}ing book`
        }
      );
    }
    
  }, [state.task])

  return <CatalogContext.Provider value = {{setShowForm, dispatch, setDialogVisible}}>
      <ConfirmDialog visible={dialogVisible} onHide={() => setDialogVisible(false)} message="Are you sure you want to delete the book?" header="Confirmation" icon="pi pi-exclamation-triangle" accept={async ()=> {dispatch({type: "DELETE", payload: await deleteBook(state.idToDelete)}); setDialogVisible(false)}} reject={()=> setDialogVisible(false)} />
      <Toast ref={toast} />
      <section>
        <div className="center">
          <Button onClick={()=> setShowForm(!showForm ? true : false)} label={!showForm ? 'Create Item' : 'Cancel'} className="p-button-raised p-button-rounded p-button-warning"/>
        </div>
        {showForm && <FormComponent/>}
        <div className="wrap">
          {
            state.books  && state.books.map((_book)=>{
              return (
                <Book key = {_book._id}  {..._book}/>
              )
            })
          }
        </div>
      </section>
  </CatalogContext.Provider>
}


const goToBuyPage = (id) => {
  console.log(`Vamos a la pagina de compra del libro con id ${id}`);
}




const FormComponent = () =>{
  const [book, setBook] = React.useState({title: "", author: "", image: "", mark: ""})

  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setBook({...book, [name]: value})
  }

  const {setShowForm, dispatch} = useContext(CatalogContext);


  const submitBook = async () =>{
    if(!book.title || !book.image || !book.author)
      return alert('Faltan campos por rellenar');

    const createdBook = await CatalogApi.createBook(book)
    if(!createdBook){
      return dispatch({type: 'CREATE', payload: null, statusOk: false})
    }


    book['_id'] = createdBook._id

    setShowForm(false)
    dispatch({type: 'CREATE', payload: book, statusOk: true})
    setBook({title: "", author: "", image: "", mark: "-"});
  }

  return (
      <section className="p-d-grid form">
        <div className="p-fluid">
            <div className="p-field">
                <label htmlFor="title"><b>Title</b></label>
                <InputText 
                  id="title" 
                  type="text" 
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                />
            </div>
            <div className="p-field">
                <label htmlFor="author"><b>Author</b></label>
                <InputText 
                  id="author" 
                  type="text" 
                  name="author"
                  value={book.author}
                  onChange={handleChange}

                />
            </div>
            <div className="p-field">
                <label htmlFor="image"><b>Image</b></label>
                <InputText 
                  id="image" 
                  type="text" 
                  name="image"
                  value={book.image}
                  onChange={handleChange}
                />
            </div>
            <div className="p-field">
                <label htmlFor="mark"><b>Mark</b></label>
                <InputText 
                  id="mark" 
                  type="text" 
                  name="mark"
                  value={book.mark}
                  onChange={handleChange}
                />
            </div>
        </div>
        <div className="p-d-flex p-jc-center">
          <Button onClick={()=>submitBook()} label="Add Item" className="p-button-raised p-button-rounded p-button-danger"/>
        </div>
      </section>
  )
}



// WAYS TO PASS PROPS
// 1) book = {_book} /at the same time. When accessing in the children component take into consideration that you are receving an object within an object
// 2) title = {_book.title} author = {_book.author} img = {_book.img}
// 3) {..._book} / spreading off the properties

//We can add whatever we want to add in between the init and the end of the tag in each Component. To retrieve that information in the children, we just need to include the
//reserved word 'children' in the params of the function.
const Book = (bookProperties) =>{
  const {setDialogVisible, dispatch} = useContext(CatalogContext);
  return <>
    <article className="border">
    <i onClick={()=>{dispatch({type: "SET_DELETE", id: bookProperties._id}); setDialogVisible(true)}} className="pi pi-trash"></i>
      <div className="img">
        <Image src = {bookProperties.image}/>
      </div>
      <div className="title">
        <NameAndAuthor {...bookProperties}/>
      </div>
      <div className="title">
        <Mark mark = {bookProperties.mark}/>
      </div>
    {/* {bookProperties.children} */}
    <div className="btn">
       {/* Here we have to introduce the function into another arrow function to avoid calling it when rendering the application */}
      <Button onClick={()=>goToBuyPage(bookProperties.id)} label="Criticize" className="p-button-raised p-button-rounded p-button-success"/>
    </div>
    </article>
  </>
}


//If we do not add the '{}' return is not explicitly neccessary
const Image = ({src}) => {
  return <img src={src} alt="" />
}


const NameAndAuthor = (bookProperties) =>{
  const {author, title} = bookProperties
  return  (
    <div>
      <p className="name">{title}</p>
      <p style={{color: 'rgb(123,108,82)', fontSize: '15px', marginTop: '0.25rem', display: 'flex', justifyContent: 'center'}}><b>{author}</b></p>
    </div>
  )
}

const Mark = ({mark}) => {
  return <div className="mark"><p>{mark}</p></div>
}


