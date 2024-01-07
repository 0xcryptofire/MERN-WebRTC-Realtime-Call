import React from 'react'
import styles from './AddRoomModal.module.css'


const AddRoomModal = () => {
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <div className={styles.modalHead}>
            <h3>Enter topic to be discussed</h3>
            <input type="text" className={styles.input} />
            <h3>Room Type</h3>
            <div className={styles.roomTypes}>
                <div className={styles.roomTypeBox}>
                    <img src="/images/earth.png" alt="Public room" />
                    <span>Open</span>
                </div>
                <div className={styles.roomTypeBox}>
                    <img src="/images/Users.png" alt="Soical room" />
                    <span>Social</span>
                </div>
                <div className={styles.roomTypeBox}>
                    <img src="/images/lock.png" alt="Private room" />
                    <span>Private</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddRoomModal
