import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = ()=>{
    const[valor,setValor]=useState('')
  const{socket}= useContext(SocketContext);

    const onSubmit=(evt)=>{
        evt.preventDefault();
        if(valor.trim().length > 0){
            socket.emit('create-band',valor)
            setValor('')
        }
    }

    return(
        <>
         <h3>Agregar Banda</h3>
         <form onSubmit={onSubmit}>
            <input
            className="form-control"
            placeholder="Nuevo nombre de banda"
            value={valor}
            onChange={(evt)=>setValor(evt.target.value)}
            />
         </form>
        </>
    )
}