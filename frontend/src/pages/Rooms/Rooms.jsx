import React, { useState } from 'react'
import styles from './Rooms.module.css'
import RoomsCard from '../../components/RoomsCard/RoomsCard'
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal'

const Rooms = () => {

  const [ showModal , setShowModal] = useState(false);

  const rooms = [
    {
      id : 1,
      topic : 'is really height matter?',
      speakers : [
        {
          id : 1,
          name : 'jaydip narola',
          avatar : '/images/monkeyemoji.png'
        },
        {
          id : 2,
          name : 'Om savaj',
          avatar : '/images/monkeyemoji.png'
        }
      ],
      totalPeople : 40,
    },
    {
      id : 2,
      topic : 'is really weigth matter?',
      speakers : [
        {
          id : 1,
          name : 'jaydip narola',
          avatar : '/images/monkeyemoji.png'
        },
        {
          id : 2,
          name : 'Om savaj',
          avatar : '/images/monkeyemoji.png'
        }
      ],
      totalPeople : 40,
    },
    {
      id : 3,
      topic : 'is really weigth matter?',
      speakers : [
        {
          id : 1,
          name : 'jaydip narola',
          avatar : '/images/monkeyemoji.png'
        },
        {
          id : 2,
          name : 'Om savaj',
          avatar : '/images/monkeyemoji.png'
        }
      ],
      totalPeople : 40,
    },
    {
      id : 4,
      topic : 'is really weigth matter?',
      speakers : [
        {
          id : 1,
          name : 'jaydip narola',
          avatar : '/images/monkeyemoji.png'
        },
        {
          id : 2,
          name : 'Om savaj',
          avatar : '/images/monkeyemoji.png'
        }
      ],
      totalPeople : 40,
    },
    {
      id : 5,
      topic : 'is really weigth matter?',
      speakers : [
        {
          id : 1,
          name : 'jaydip narola',
          avatar : '/images/monkeyemoji.png'
        },
        {
          id : 2,
          name : 'Om savaj',
          avatar : '/images/monkeyemoji.png'
        }
      ],
      totalPeople : 40,
    },
  ] 

  const openModal = ()=>{
    setShowModal(true);
  }
  const closeModal = () =>{
    setShowModal(false)
  }
  return (
    <>
      <div className="container">
        <div className={styles.roomHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All Voice Rooms</span>
            <div className={styles.searchBox}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoomBtn} onClick={openModal} >
            <i className="fa-solid fa-users"></i>
            <span>Start a room</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {
            rooms.map(room => {
              return <RoomsCard key={room.id} room={room} />
            })
          }
        </div>
      </div>
      {showModal && <AddRoomModal closeModal={closeModal}/>}
    </>
  )
}

export default Rooms
