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
          <div key={client._id} className={styles.userhead}>
            <audio
              ref={(instance) => provideRef(instance , client._id)}
              // controls
              autoPlay
            ></audio>
            <img src={client.avatar} alt="user-avatar" className={styles.userAvatar} />
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
