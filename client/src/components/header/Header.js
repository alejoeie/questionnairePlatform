import React , {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios'
import {fetchUser, dispatchGetUser} from '../../redux/actions/authAction'
import { useDispatch } from 'react-redux';
import NotFound from '../../components/utils/NotFound/NotFound'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Header.css"
function Header() {
    const auth = useSelector(state => state.auth)

    const token = useSelector(state => state.token)

    const [userName, setUserName] = useState('');
    const {user, isLogged, isAdmin} = auth
    const [callback, setCallback] = useState(false)


    const dispatch = useDispatch()
    useEffect(() => {
        if(isLogged){
            fetchUser(token).then(res => {
                dispatch(dispatchGetUser(res))
                setUserName(res);
            })
        }
    }, [token, isLogged, callback, dispatch])
    // console.log(userName.data.user.name);

    // console.log(auth.user.name);

    const handleLogout = async () => {
        try{
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/"

        }catch(err) {
            window.location.href = "/"
        }
    }

    //Para el dashboard 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

    const userLink = () => {
        return <div className="heading">
          <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
     <Toolbar>
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="menu"
         sx={{ mr: 2 }}
       >
         
       </IconButton>
       <i className="fas fa-user"></i>
       <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
       
         Bienvenido(a)
       </Typography>
            <Button color="inherit"><i className="fas fa-user"></i><Link to="/profile">Perfil</Link></Button>
           <Button color="inherit" onClick={handleLogout}><i className="fas fa-user"></i><Link to="/logout">Cerrar Sesion</Link></Button>
           
           
       
       
       

     </Toolbar>
     
   
   </AppBar>
   </Box>
      </div>
        // return <li className="drop-nav dropper">
        //     <Link to="/" className>
        //     <i className="fas fa-user-circle"></i>
        //         Bienvenido(a) 
        //         <i className="fas fa-angle-down"></i>
        //         </Link>
        //         <ul className="dropdown">
        //             <li><Link to="/profile">Perfil</Link></li>
        //             <li><Link to="/logout" onClick={handleLogout}>Cerrar Sesión</Link></li>
        //             <li><Link to="/profile_admin">Admin</Link></li>
        //         </ul>
        // </li>
    }
    const adminLink = () => {
        return <li>
            <Link to="/">
            {/* <img src={user.avatar} alt=""/> */}
            <i className="fas fa-user-cog"></i>
                Admin 
                <i className="fas fa-angle-down"></i>
                </Link>
                <ul className="dropdown">
                    <li><Link to="/profile">Perfil</Link></li>
                    <li><Link to="/logout" onClick={handleLogout}>Cerrar Sesión</Link></li>
                    <li><Link to="/profile_admin">Admin</Link></li>
                </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    const [value, setValue] = React.useState(0);

    return (
        // <header>
        //     <div className="logo">
        //         <h1><Link to="/">Practicas de Admisión</Link></h1>
        //     </div>

        //     <ul style={transForm}>
            
        //     {
        //             isLogged
        //             ? userLink()
        //             :<ul><li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
        //             <li><Link to="/register"><i className="fas fa-user-graduate"></i>Registrarse</Link></li></ul>
                    
                    
        //         }
        //     {/* {
        //         isAdmin 
        //         ? adminLink() 
        //         : <ul><li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
        //         <li><Link to="/register"><i className="fas fa-user-graduate"></i>Registrarse</Link></li></ul>
        //     } */}
        //     </ul>
            
        // </header>

     <div className="heading">   
    <Box sx={{ flexGrow: 1 }}>
    {isLogged ? userLink() : 
      <div>
      <AppBar position="static">
     
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pruebas de Admision
          </Typography>
            
            
              <Button color="inherit"><i className="fas fa-user"></i><Link to="/login">Login</Link></Button>
              <Button color="inherit"><i className="fas fa-user-graduate"></i><Link to="/register">Register</Link></Button>
              
              
          
          
          
   
        </Toolbar>
        
      
      </AppBar>
      </div>}
    </Box>
    </div>



        
    )
}

export default Header

