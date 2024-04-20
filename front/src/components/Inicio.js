import React from 'react'
import Container from 'react-bootstrap/Container'

const Inicio = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh', 
            textAlign: 'center' 
        }}>
            <h1 style={{ paddingBottom: "30px",paddingTop: "30px" }}>Bienvenido</h1>

            <Container>
                <h4>
                En esta página, podrás escribir una reseña sobre un hotel y obtener una calificación promedio basada en tu opinión. Además, podrás ver un análisis de las palabras más importantes para cada calificación, utilizando un conjunto de datos de reseñas anteriores.
                </h4>
                <h4>
                Además, gracias a nuestro análisis de palabras clave, podrás descubrir qué aspectos son más valorados o criticados por los huéspedes en cada rango de calificación. Esta información es invaluable para que los hoteles puedan identificar áreas de mejora y enfocarse en los factores que realmente importan a sus clientes.
                </h4>
            </Container>
            <img style={{height: "200px", paddingTop: "20px"}}  src = "https://t4.ftcdn.net/jpg/01/15/20/75/360_F_115207580_US2etunH78I7iMYHOoNVvxQTCIdoPdRj.jpg" alt="thumbs up" />
        </div>
    )
}

export default Inicio