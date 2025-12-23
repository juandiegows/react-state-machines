import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send({ type: 'DONE' });
  }

  const submit = (e) => {
    e.preventDefault();
    send({ type: 'ADD', newPassenger: value });
    changeValue('');
  }

  const deletePassenger = (name) => {
    send({ type: 'DELETE', name });
  }

  const { passengers } = state.context;

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      {passengers.map((person, idx) => (
        <p className='text' key={`person-${idx}`}>
          {person}
          <button
            type="button"
            onClick={() => deletePassenger(person)}
            style={{ marginLeft: '10px', cursor: 'pointer', background: 'transparent', border: 'none' }}
          >
            <svg
              width="19px" height="19px"
              fill="#000000"
              viewBox="0 0 24 24"
              id="delete-alt"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-line" // Cambiado de class a className
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  id="secondary"
                  d="M5,8H18a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a0,0,0,0,1,0,0V8A0,0,0,0,1,5,8Z"
                  transform="translate(26 2) rotate(90)"
                  // FIX: Convertido de string a objeto
                  style={{ fill: '#ba2c2c', strokeWidth: '2' }}
                />
                <path
                  id="primary"
                  d="M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7"
                  // FIX: Convertido de string a objeto
                  style={{ fill: 'none', stroke: '#000000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2' }}
                />
                <path
                  id="primary-2"
                  data-name="primary"
                  d="M10,11v6m4-6v6M4,7H20M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Z"
                  // FIX: Convertido de string a objeto
                  style={{ fill: 'none', stroke: '#000000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2' }}
                />
              </g>
            </svg>
          </button>
        </p>
      ))}
      <input
        id="name"
        name="name"
        type="text"
        placeholder='Escribe el nombre completo'
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};