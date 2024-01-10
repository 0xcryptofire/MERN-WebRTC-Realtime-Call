import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";
import { useWebRtc } from "../../hooks/useWebRTC";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients , provideRef } = useWebRtc(roomId, user);
  return (
    <div>
      {console.log(clients)}
      <h1>All Connected user</h1>
      {clients && clients.map((client) => {
        return (
          <div key={client._id}>
            <audio
              ref={(instance) => provideRef(instance , client._id)}
              controls
              autoPlay
            ></audio>
            <h2>{client.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
