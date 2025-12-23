import React, { useState } from 'react';
import './Search.css';

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState('');

  // Extraemos los países y el error del contexto de la máquina
  const { countries, error } = state.context;

  const goToPassengers = () => {
    send({
      type: 'CONTINUE',
      selectCountry: flight
    });
  }

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  // 1. Estado de Carga: Mientras la API responde
  if (state.matches('search.loading')) {
    return <p className='Search-loading'>Cargando destinos...</p>;
  }

  // 2. Estado de Error: Si la petición falló
  if (state.matches('search.failure')) {
    return (
      <div className='Search-error'>
        <p>{error || 'Hubo un error al obtener los países'}</p>
        <button onClick={() => send({ type: 'RETRY' })} className='button'>
          Reintentar
        </button>
      </div>
    );
  }

  // 3. Estado de Éxito: Pintamos el select con datos de la API
  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      
      <select 
        id="country" 
        className='Search-select' 
        value={flight} 
        onChange={handleSelectChange}
      >
        <option value="" disabled>Escoge un país</option>
        
        {/* Usamos el nombre común de la API restcountries */}
        {countries.map((country) => (
          <option 
            value={country.name.common} 
            key={country.cca3 || country.name.common}
          >
            {country.name.common}
          </option>
        ))}
      </select>

      <button 
        onClick={goToPassengers} 
        disabled={flight === ''} 
        className='Search-continue button'
      >
        Continuar
      </button>
    </div>
  );
};