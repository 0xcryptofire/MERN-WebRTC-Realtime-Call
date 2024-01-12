import { useCallback, useRef, useState } from "react";
import { useStateWithCllaback } from "./useStateWithCallback";
import { useEffect } from "react";
import socketInit from "../socket/index";
import freeice from "freeice";

export const useWebRtc = (roomId, user) => {
  const [clients, setClients] = useStateWithCllaback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null); // for current user
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  // addNewClient

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client._id === newClient._id); // check that client already exist or not

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
      addNewClient(user, () => {
        const localElement = audioElements.current[user._id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        // socket emit JOIN
        socket.current.emit("join", { roomId, user });
      });
    });

    return () =>{
      // leaving room
      localMediaStream.current.getTracks().forEach(track => track.stop());

      socket.current.emit('leave' , {roomId})
    }
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      console.log(remoteUser);
      // if peer is already connected then give warning
      if (peerId in connections.current) {
        return console.log(
          `you are already connected with ${peerId} (${remoteUser.name})`
        );
      }

      // else we we creare RTC connection

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      // handle new ice candidate

      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit("actions-relay", {
          peerId,
          icecandidate: event.candidate,
        });
      };

      // handle on track on this connection
      console.log(peerId);
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser._id]) {
            audioElements.current[remoteUser._id].srcObject = remoteStream;
          } else {
            let settled = false;

            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }

              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // add loacal track to remote connection 
      localMediaStream.current.getTracks().forEach(track => {
        connections.current[peerId].addTrack(track , localMediaStream.current);
      });

      // create offer

      if (createOffer) {
        const  offer = await connections.current[peerId].createOffer();
        await connections.current[peerId].setLocalDescription(offer);
        // send offer to another client
        socket.current.emit('relay-sessionDescription' , {
          peerId,
          sessionDescription : offer,
        })

      }
    };
    socket.current.on("add-peer", handleNewPeer);

    // cleanup function

    return () => {
      socket.current.off('add-peer');
    }
  }, []);

  // handle ice-candidate
  useEffect(()=>{
    socket.current.on('ice-candidate' , ({peerId , icecandidate})=>{
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    })

    return () => {
      socket.current.off('ice-candidate')
    }
  },[]);
  // handle session-description
  useEffect(()=>{

    const hadleRemoteSDP = async ({peerId , sessionDescription : remoteSessionDescription}) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      )

      // if session desc. type is offer then create answer
      if (remoteSessionDescription.type === 'offer') {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer()

        connection.setLocalDescription(answer);

        socket.current.emit('relay-sessionDescription' , {
          peerId,
          sessionDescription : answer
        })
      }
    }
    socket.current.on('session-description' , hadleRemoteSDP);

    return () => {
      socket.current.off('session-description')
    }
  },[]);

  // handel remove peer
  useEffect(()=>{
    const handleRemovePeer =  async ({peerId , userId}) =>{
        if (connections.current[peerId]) {
          connections.current[peerId].close()

          delete connections.current[peerId];
          delete audioElements.current[peerId];

          setClients( list => list.filter( client => client._id !== userId))
        }
    }
    socket.current.on('remove-peer' , handleRemovePeer)
    return () => {
      socket.current.off('remove-peer')
    }
  },[])

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef };
};
