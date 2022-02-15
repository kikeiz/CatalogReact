import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Link, NavLink } from 'react-router-dom';



const items = [
    {
       label:'Buypage',
       icon:'pi pi-fw pi-file',
       to: '/buypage',
       command: (event) => <NavLink to="/buypage"></NavLink>
    },
    {
       label:'Catalog',
       icon:'pi pi-fw pi-pencil',
       to: '/catalog',
       command: () => <NavLink to="/catalog"></NavLink>
    },
];



export const Menu = () =>{
    return <>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/buypage">Buypage</NavLink>
        {/* <Menubar model={items} end={<InputText placeholder="Search" type="text"/>}/> */}
    </>
}