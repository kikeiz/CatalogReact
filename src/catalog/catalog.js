//Importamos React 
import React from 'react';
import './catalog.scss'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { v4 as uuidv4 } from 'uuid';


//LIBRARY

// const books = [
//   {
//     id: 1,
//     title: 'El viento',
//     author: 'Maria de Molina',
//     img: 'https://imagessl2.casadellibro.com/a/l/t0/52/9788499086552.jpg',
//     mark: 7
//   },
//   {
//     id: 2,
//     title: 'La margarita',
//     author: 'Penelope Cruz',
//     img: 'https://fotos-bb2b.s3.eu-west-3.amazonaws.com/wp-content/uploads/2021/09/07015318/portada-de-libros-famosos.jpg',
//     mark: 8

//   },
//   {
//     id: 3,
//     title: 'Harry Potter',
//     author: 'Keira Knightly',
//     img: 'https://wl-genial.cf.tsp.li/resize/728x/jpg/ba3/e72/337d485c37af5cf13264ff037c.jpg',
//     mark: 9

//   },
//   {
//     id: 4,
//     title: 'El Molino',
//     author: 'Gerard Depardieu',
//     img: 'https://media.revistaad.es/photos/60c227359ae22619e08751b2/master/w_1600%2Cc_limit/247747.jpg',
//     mark: 6

//   },
//   {
//     id: 5,
//     title: 'Todo o nada',
//     author: 'Robert de Niro',
//     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMoEsPeKXDPFoQqYxOzjCSkJce7JMmO7_EJQ&usqp=CAU',
//     mark: 7

//   },
//   {
//     id: 6,
//     title: 'Las Manzanas',
//     author: 'Elsa Pataky',
//     img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/romantic-novel-cover-design-template-1f302ee20814ee9513506d90de228af7_screen.jpg?ts=1588747771',
//     mark: 8
//   }
// ]


export const Catalog = () =>{
  const [showForm, setShowForm] = React.useState(false)
  const [books, setBooks] = React.useState([])

  return (
    !showForm ?
      <section>
        <div className="center">
          <Button onClick={()=>setShowForm(true)} label="Create Item" className="p-button-raised p-button-rounded p-button-warning"/>
        </div>
        <div className="wrap">
          {
            books.map((_book)=>{
              return (
                <Book key = {_book.id} {..._book}/>
              )
            })
          }
        </div>
      </section>
    : <FormComponent setShowForm = {setShowForm} setBooks = {setBooks}/>
  )
}


const goToBuyPage = (id) => {
  console.log(`Vamos a la pagina de compra del libro con id ${id}`);
}




const FormComponent = ({setShowForm, setBooks}) =>{
  const [book, setBook] = React.useState({title: "", author: "", image: "", mark: "-"})

  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setBook({...book, [name]: value})
    
  }

  const submitBook = () =>{
    if(!book.title || !book.image || !book.author)
      return alert('Faltan campos por rellenar');

    book['id'] = uuidv4();
    setBooks((books)=>{
      return [...books, book];
    })
    setBook({title: "", author: "", image: "", mark: "-"});

    setShowForm(false)
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
  return (
    <article className="border">
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
  )
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


