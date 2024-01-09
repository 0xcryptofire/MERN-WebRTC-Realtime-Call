import React from "react";
import styles from "./RoomsCard.module.css";
import { useNavigate } from "react-router-dom";

const RoomsCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.roomsCard} onClick={() => navigate(`/room/${room._id}`) } >
      <h3>{room.topic}</h3>
      <div className={`${styles.speakers} ${room.speakers.length === 1 ? styles.singleSpeaker :''}`}>
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => {
            return <img key={speaker._id} src={speaker.avatar} alt="speaker-avatars" />;
          })}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => {
            return (
              <div key={speaker._id} className={styles.nameWrapper}>
                <span>{speaker.name}</span>
                <i className="fa-solid fa-comment"></i>
              </div>
            );
          })}
        </div>
      </div>
        <div className={styles.countUser}>
          <span>{room.totalPeople} </span>
          <i className="fa-regular fa-user"></i>
        </div>
    </div>
  );
};

export default RoomsCard;
