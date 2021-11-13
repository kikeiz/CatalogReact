//Importamos React 
import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'
import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css'                                //icons
import { Button } from 'primereact/button';
import { Catalog} from './catalog/catalog';
//LIBRARY


//Este método búsca dos cosas:
// 1) Lo que vamos a renderizar
// 2) Donde lo vamos a renderizar
ReactDom.render(<div><Catalog/></div>  , document.getElementById('root'))