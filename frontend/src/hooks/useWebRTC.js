import { useCallback, useRef, useState } from "react";
import { useStateWithCllaback } from "./useStateWithCallback";
import { useEffect } from "react";
import socketInit from "../socket/index";


export const useWebRtc = (roomId, user) => {
  const [clients, setClients] = useStateWithCllaback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null); // for current user
  const socket  = useRef(null)


  useEffect( () =>{
    socket.current = socketInit()
  },[])

  
  // addNewClient
  
  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client._id === newClient._id);  // check that client already exist or not
      
      // if not exist then add it to clients
      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  // capturing media

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };
    startCapture().then(() => {
      addNewClient(user , () => {
        const localElement = audioElements.current[user._id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        // socket emit JOIN
        socket.current.emit('join' , {roomId , user})
      })
    });
  }, []);
  
  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients , provideRef };
};
