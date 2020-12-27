import React, { useContext } from "react";
import { BandAdd } from "../components/BandAdd";
import { BandList } from "../components/BandList";
import BandChat from '../components/BandChart';
import {SocketContext  } from "../context/SocketContext";



function HomePage() {
  const{online} = useContext(SocketContext)
 

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="badge bg-success">Online</span>
          ) : (
            <span className="badge bg-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>Band names</h1>
      <hr />
      <div className="row">
        <div className="col">
           <BandChat/>
        </div>
      </div>

      <div className="row">
        <div className="col-8">
         <BandList/>
        </div>

        <div className="col-4">
          <BandAdd/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
