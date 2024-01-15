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
  const { clients, provideRef , handleMute } = useWebRtc(roomId, user);
  const [room, setRoom] = useState(null);
  const [isMute , setIsMute] = useState(true);

  const handleBack = () => {
    navigate("/rooms");
  };

  const handleMuteClick = (clientId) => {
    if (clientId !== user._id) return;
    setIsMute(isMute => !isMute)
  }

  useEffect(() => {
    handleMute(isMute,user._id);
  },[isMute])

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom(prev => data);
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
                    <button onClick={() => handleMuteClick(client._id)} className={styles.micBtn}>
                      {client.muted ? (
                        <i className="fa-solid fa-microphone-slash"></i>
                        ) : (
                          <i className="fa-solid fa-microphone"></i>
                      )}
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
