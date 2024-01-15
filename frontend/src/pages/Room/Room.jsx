import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";
import { useWebRtc } from "../../hooks/useWebRTC";
import { getRoom } from "../../http";

const Room = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef } = useWebRtc(roomId, user);
  const [room, setRoom] = useState(null);

  const handleBack = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      console.log(data);
      setRoom(data);
    };
    fetchRoom();
  }, [roomId]);

  return (
    <div>
      <div className="container">
        <button className={styles.goBack} onClick={handleBack}>
          <i className="fa-solid fa-arrow-left"></i>
          <span>All Voice Rooms</span>
        </button>
      </div>
      <div className={styles.clientWrap}>
        <div className={styles.header}>
          <p className={styles.topic}>{room && room.topic}</p>
          <div className={styles.actions}>
            <button>
              <i className="fa-solid fa-hand"></i>
            </button>
            <button onClick={handleBack}>
              <i className="fa-solid fa-hand-peace"></i>
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients &&
            clients.map((client) => {
              return (
                <div key={client._id} className={styles.client}>
                  <div className={styles.userhead}>
                    <audio
                      ref={(instance) => provideRef(instance, client._id)}
                      // controls
                      autoPlay
                    ></audio>
                    <img
                      src={client.avatar}
                      alt="user-avatar"
                      className={styles.userAvatar}
                    />
                    <button className={styles.micBtn}>
                      <i className="fa-solid fa-microphone-slash"></i>
                    </button>
                  </div>
                  <h4>{client.name}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Room;
