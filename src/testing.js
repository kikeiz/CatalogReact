//Just by writing 'rafce', the extension of "ES7 React will make for us this root of a component"
import React from 'react'

const testing = () => {
    return (
        <div>
            que tal como estas
        </div>
    )
}


//JSX Rules:
// A. Always return a single element. It can be as complex as we want but it must be only one.
//    Esto quiere decir que todo debe ir, por ejemplo, dentro de un div. Es decir, en el primer nivel no
//    puede haber dos divs. Para evitar el "div hell" en react existe lo que se llama React.Fragment
//    que finalmente creará un div en el html pero que mejora la intelegibilidad del documento.
// B. Las clases de CSS se definen como className y no como class. En general para todos los elementos que
//    acompañan al html hay que usar camelCase, como por ejemplo para los eventos.
// C. Para los return, no es obligatorio el uso de paréntesis. Sin embargo, te hace la vida mucho más fácil.
//    Si no se escriben, tienes que estar seguro de que la etiqueta de apertura del componente esté en la misma
//    linea que el propio return.

//Las funciones que serán utilizadas como componentes deben estar tener la PRIMERA LETRA MAYÜSCULA
//para poder renderizarse correctamente. El html que se está retornondo es que aparecerá en el 
//html
function Greeting(){
    return (
    <h4>Este es el primer componente que estamos haciendo en React</h4>
    )
  }
  
  function ReactFragment(){
    return <React.Fragment>
      <div>
        <div>
          Me gusta:
        </div>
        <input type="text" />
        <div>
          No me gusta
        </div>
        <input type="text" />
      </div>
    </React.Fragment>
  }
  
  //Tambien podemos utilizar el tipo arrow de funciones. En este caso vamos a utilizar otra forma de crear elementos. 
  //El método createElement necesita tres parámetros:
  //1) El input o etiqueta padre
  //2) Los props (todavía no los vemos)
  //3) Los children del elemento padre
  const Adios = () =>{
    return React.createElement('h1', {}, <div>
      <input type="number" />
      <input type="text" />
    </div>)
  }
  
  const OtherWay = () =>{
    return React.createElement('h1', {}, React.createElement('h2', {}, 'Amigo mio'))
  }
  
  
  //NESTED COMPONENTS
  //
  const ComponentOne = () =>{
    return(
      <div>
        <ComponentTwo/>
        <p>El componente de arriab es el componente dos y el de abajo será...</p>
        <ComponentThree/>
      </div>
    )
  }
  
  const ComponentTwo = () =>{
      return (
        <div>Metemos el componente dos en el componente uno</div>
      )
  }
  
  const ComponentThree = () =>{
    return (
      <div>El tres</div>
    )
  }
export default testing

