import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  // Extraer proyectos del state inicial
  const proyectosContext = useContext(proyectoContext);
  const {mensaje, listaProyectos, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // Obtener Proyectos cuando carga el componente
  useEffect(() => {

    if(mensaje){
      mostrarAlerta(mensaje.msg,mensaje.categoria);
    }


    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  // Revisar si existe contenido
  if (listaProyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {
      alerta ? 
      (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) 
      : null
      }
      <TransitionGroup>
        {listaProyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
