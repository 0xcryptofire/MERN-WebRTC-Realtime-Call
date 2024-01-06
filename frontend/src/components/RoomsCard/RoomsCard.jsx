import React from "react";
import styles from "./RoomsCard.module.css";

const RoomsCard = ({ room }) => {
  return (
    <div className={styles.roomsCard}>
      <h3>{room.topic}</h3>
      <div className={styles.speakers}>
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => {
            return <img src={speaker.avatar} alt="speaker-avatars" />;
          })}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => {
            return (
              <div className={styles.nameWrapper}>
                <span>{speaker.name}</span>
                <i class="fa-solid fa-comment"></i>
              </div>
            );
          })}
        </div>
      </div>
        <div className={styles.countUser}>
          <span>{room.totalPeople} </span>
          <i class="fa-regular fa-user"></i>
        </div>
    </div>
  );
};

export default RoomsCard;
