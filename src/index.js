//Importamos React 
import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'
import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css'                                  //icons
import 'primeflex/primeflex.css';                               
import { Catalog} from './catalog/catalog';
import {Menu} from './menu/menu'
//LIBRARY


//Este método búsca dos cosas:
// 1) Lo que vamos a renderizar
// 2) Donde lo vamos a renderizar
ReactDom.render(<div><Menu/><Catalog/></div>  , document.getElementById('root'))