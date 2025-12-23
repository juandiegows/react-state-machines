import React from 'react';
import { Welcome } from '../Components/Welcome';
import { Search } from '../Components/Search';
import { Passengers } from '../Components/Passengers';
import { Tickets } from '../Components/Tickets';
import './StepsLayout.css';

/**
 * Mapeo de estados a componentes.
 * Extraerlo fuera del componente evita que se cree en cada renderizado.
 */
const COMPONENT_MAP = {
  initial: Welcome,
  search: Search,
  tickets: Tickets,
  passengers: Passengers,
};

export const StepsLayout = ({ state, send }) => {
  // Buscamos qué estado coincide con las llaves de nuestro mapa
  const currentState = Object.keys(COMPONENT_MAP).find((key) => state.matches(key));
  
  // Obtenemos el componente dinámicamente
  const Component = COMPONENT_MAP[currentState];

  return (
    <div className='StepsLayout'>
  
      {Component ? <Component send={send} state={state} /> : null}
    </div>
  );
};