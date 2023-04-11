const axios = require('axios')

let back = 'http://localhost:3001'

export class CatalogApi{
    
   public static retrieveBooks = async () =>{
    const books = await axios.get(`${back}/catalog`)    
    if(books.status !== 200 && books.status !== 404) 
        return []

    return books?.data?.data || []
   } 

   public static saveImage = async (formData: any) =>{    
    const response = await axios.post(`${back}/catalog/image`, formData , {
        headers: {
          "Content-Type": "multipart/form-data"
        }
    })
   

    return response
    
   }
   public static createBook = async (book:any) =>{       
    const createdBook = await axios.post(`${back}/catalog`, book)
    .catch((err:any)=>{
        console.error(err);
    })    
    if(createdBook.status !== 200 && createdBook.status !== 404) 
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
