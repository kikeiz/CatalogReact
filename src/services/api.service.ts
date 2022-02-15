const axios = require('axios')

let back = 'http://localhost:3001/mproject'

export class CatalogApi{
    
   public static retrieveBooks = async () =>{
    const books = await axios.get(`${back}/catalog`)
    
    if(books.data.status !== 200 && books.data.status !== 404) 
        return []

    return books.data.data
   } 

   public static createBook = async (book:any) =>{
       
    const createdBook = await axios.post(`${back}/catalog`, book)
    .catch((err:any)=>{
        console.log(err);
    })    
    if(createdBook.data.status !== 200 && createdBook.data.status !== 404) 
        return null

    return createdBook.data.data
   } 

   public static updateBook = () =>{
        return axios.post(`${back}/catalog`)
   } 

   public static deleteBook = async (id:any) =>{ 
       return axios.delete(`${back}/catalog/${id}`)
       
   }


}
