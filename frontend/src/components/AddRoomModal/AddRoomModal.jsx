import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import { createRooms as create } from "../../http";
import { useNavigate } from 'react-router-dom'

const AddRoomModal = ({ closeModal }) => {
  const [roomType, setRoomType] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const createRoom = async () =>{
    // server request
    try {
      if (!topic) return;
      const { data } = await create({topic , roomType});
      navigate(`/room/${data._id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button className={styles.closebtn} onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className={styles.modalHead}>
          <h3>Enter topic to be discussed</h3>
          <input type="text" className={styles.input} value={topic} onChange={(e) => setTopic(e.target.value)} />
          <h3>Room Type</h3>
          <div className={styles.roomTypes}>
            <div
              onClick={() =>setRoomType('open')}
              className={`${styles.roomTypeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/earth.png" alt="Public room" />
              <span>Open</span>
            </div>
            <div
            onClick={() =>setRoomType('social')}
              className={`${styles.roomTypeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/Users.png" alt="Soical room" />
              <span>Social</span>
            </div>
            <div
            onClick={() =>setRoomType('private')}
              className={`${styles.roomTypeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/Lockprivate.png" alt="Private room" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h3>Start a room, open to everyone</h3>
          <button onClick={createRoom}>
            <img src="/images/Emojicelebration.png" alt="emoji" />
            Let's Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
