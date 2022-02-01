import * as React from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Questions from "../body/questions/Questions";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {useSelector, useDispatch} from 'react-redux';
import './Home.css'
import ContainerCard from "./ContainerCard";


export default function BasicCard() {
  const auth = useSelector(state => state.auth)

  const {user, isAdmin, isLogged} = auth

  const navigate = useNavigate()

  const handleClicker = () => {
    navigate('/questions')
  }
  const handleProfile = () => {
    navigate('/profile')
  }

  const handleAddQuestionnaire = () => {
    navigate('/profile_admin')
  }

  const handlePractice = () => {
    navigate('/add_questions')
  }
  return (
    <Container>
      <h2>Vistas</h2>
      <Grid container spacing={2}>
        {isAdmin ?  <ContainerCard description="Agrega cuestionarios" functionality="Agrega un cuestionario a la base de datos" action={handleAddQuestionnaire} btnName="Agregar Cuestionario"/> :

      <ContainerCard description="Agrega cuestionarios" functionality="Agrega un cuestionario a la base de datos" action={handleProfile} btnName="Solo administradores"/>
}

{isAdmin ?         <ContainerCard description="Agrega pregunta" functionality="Agrega preguntas a un cuestionario respectivo" action={handlePractice} btnName="Agregar Preguntas"/> :
        <ContainerCard description="Agrega pregunta" functionality="Agrega preguntas a un cuestionario respectivo" action={handlePractice} btnName="Solo administradores"/>

}
        <ContainerCard description="Practicar" functionality="Muestra los cuestionarios disponibles y el usuario elige" action={handleClicker} btnName="Ir a practicar"/>
        <ContainerCard description="Perfil" functionality="Va al perfil del usuario y se muestra su informacion" action={handleProfile} btnName="Ir al perfil"/>
      </Grid>
    </Container>
  );
}
