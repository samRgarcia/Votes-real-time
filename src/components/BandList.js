import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';


export const BandList =()=>{
    const[bands,setBands]=useState([]);
    const {socket} = useContext(SocketContext)

    useEffect(()=>{
        socket.on("current-bands", (dataBand) => {
            setBands(dataBand);
            
          });
          return () =>socket.off('current-bands')
    },[socket])

const cambioNombre=(event,id)=>{
    const nuevoNombre = event.target.value;
console.log('changeName',nuevoNombre)
    setBands(bands =>bands.map(band=>{
        if(band.id === id){
            band.name = nuevoNombre;
        }

        return band;
    }))
}

const onPerdioFoco=(id,nombre)=>{
    // disparar el evento del socket 
    socket.emit("rename-banda",{id,nombre})
}

const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  const deleteBand = (id) => {
    socket.emit("borrar-banda", id);
  };

    const crearRows =()=>{
        return(
            bands.map(item =>(
                <tr key={item.id}>
                <td>
                    <button 
                    className="btn btn-primary"
                    onClick={()=>votar(item.id)}
                    >+1</button>
                </td>
                <td>
                    <input 
                    className="form-control"
                    value={item.name}
                    onChange={(evet)=> cambioNombre(evet,item.id)}
                    onBlur={()=> onPerdioFoco(item.id,item.name)}
                    />
                </td>
                <td><h3>{item.votes}</h3></td>
                <td><button className="btn btn-danger" onClick={() => deleteBand(item.id)}>Borrar</button></td>
            </tr>
            ))
       
        )
    }
    return(
        <>
        <h3>Bandas actuales</h3>
        <table className ="table table-stripped">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
{crearRows()}
            </tbody>
        </table>
        </>
    )
}