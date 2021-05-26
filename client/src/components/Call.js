import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import './Call.css'
import ScriptTag from 'react-script-tag';
import $ from 'jquery'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom'
import * as faceapi from 'face-api.js'
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import * as hark from 'hark';
import Button from '@material-ui/core/Button';
import CallIcon from '@material-ui/icons/Call';
import AcceptCall from '@material-ui/icons/PhoneEnabled';
import RejectCall from '@material-ui/icons/PhoneDisabled'

const Demo = props => (
  <ScriptTag type="text/javascript" defer src="/client/src/components/face-api.min.js" />
)
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 60%;
  height: 60%;
`;
 

function Call() {
    const [yourID, setYourID] = useState("");
    const [yourName, setYourName] = useState("")
    const [users, setUsers] = useState({});
    // const users = [{id : 13123123123}, {id: 12312312332}]
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [mute, unMute] = useState(true);
    const [enableVideo, setEnableVideo] = useState(true);
    const [visible, setVisible] = useState ();
    const [candidateEmotion, setCandidateEmotion] = useState([]);

    const auth = useSelector(state => state.auth)
    
    const {user, isLogged, isAdmin} = auth
    const dispatch = useDispatch()
    
    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();
    const videoRef = useRef();
    const endPoint = 'http://localhost:5000'
    var userName;
    var allEmotions = [];

    useEffect(() => {
      console.log("heyyyyyyyyyyyyyyyyyyyyyyyy",user.name)
      socket.current = io.connect(endPoint, { transports: ['websocket'] ,upgrade: false });
      // socket.current = socketIOClient("http://localhost:3000/call")
      console.log("gotten")
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })
      userName= user?.name;
      
      socket.current.on("yourID", (id) => {
        // setYourID(id); /////////////////////////////////////////
        setYourID(id)
        // setYourName(user)
      })
      socket.current.on("allUsers", users => {
        setUsers(users); // ======================
        // setUsers(userName); // ======================
      })
      // console.log("current users :" ,users)
      socket.current.on("hey", (data) => {
        setReceivingCall(true);
        // console.log("data from", data)
        setCaller(data.from);
        setCallerSignal(data.signal);
      })
      // console.log("current users :" ,users)
    
      let text = $('input');
      console.log("hey" ,text)

      $('html').keydown(e => {
        if(e.which === 13 && text.val().length !==0){
          // console.log(text)
          console.log(text.val())
          socket.current.emit('message', text.val());
          text.val('');
          
        }
      })

      //receiving message we sent to server in jquery function

      socket.current.on('createMessage', message => {
        // console.log('this is coming from server')
        $('ul').append(`<li class = "message">
            <b id = "a"> User </b>
            <br/>
            ${message}
        </li>`);
        // document.getElementById('a').innerHTML = userName;
        scrollToBottom();
      })

      const scrollToBottom = () => {
        let d = $('.main_chat_window');
        d.scrollTop(d.prop("scrollHeight"));
      }
      
    
      
    }, [ ]);

    //end of useeffect

    useEffect ( ()=> {
      console.log("state :", visible );
      setTimeout(() => {
        setVisible();
      },5000)
    },[visible])
  
    function callPeer(id) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
  
          iceServers: [
              {
                  urls: "stun:numb.viagenie.ca",
                  username: "sultan1640@gmail.com",
                  credential: "98376683"
              },
              {
                  urls: "turn:numb.viagenie.ca",
                  username: "sultan1640@gmail.com",
                  credential: "98376683"
              }
          ]
      },
        stream: stream,
      });
  
      peer.on("signal", data => {
        socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
      })
  
      peer.on("stream", stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  
      socket.current.on("callAccepted", signal => {
        setCallAccepted(true);
        peer.signal(signal);
      })
      
      
    }

    useEffect(() => {
      const loadModels = async () => {
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]).then(startVideo);
      }
      loadModels()
    }, [])

    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        stream => videoRef.current.srcObject = stream,
        err => console.error(err)
      )
    }

    const emotionDetection = () => {
      var options = {}
      var speechEvents = hark(stream, options)
      speechEvents.on('speaking', function() {
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          let values = detections[0]
          let emotions = values?.expressions
          let sortedEmotions = emotions?.asSortedArray()
          if (typeof sortedEmotions !== 'undefined') {
            console.log(sortedEmotions[0])
            let dominantEmotion = sortedEmotions[0]
            allEmotions.push(dominantEmotion)
          }
        }, 5000)
      })
      
    }
  
    function acceptCall() {
      setCallAccepted(true);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", data => {
        socket.current.emit("acceptCall", { signal: data, to: caller })
      })
  
      peer.on("stream", stream => {
        videoRef.current.srcObject = stream;
      });
  
      peer.signal(callerSignal);
    }
    
    function rejectCall() {
      setReceivingCall(false);
      setCaller("");
      setCallerSignal(""); 
    }
   

    let UserVideo;
    if (stream) {
      UserVideo = (
        <div>
           <video className= "userVideo" playsInline muted ref={videoRef} autoPlay />  
        </div>
      );
    }
  
    let PartnerVideo;
    if (callAccepted) {
      PartnerVideo = (
        <div>
          <video className= "partnerVideo" playsInline  ref={videoRef} autoPlay onPlay={emotionDetection}/>
          
        </div>
      );
    }
  
    let incomingCall;
    if (receivingCall) {
      
      incomingCall = (
        <div className = "incomingCall" >
          <div className="header">
            <h3>{isAdmin ? "Candidate" : "Interviewer"} is calling you</h3>
          </div>
          <div className="buttons">
            <Button
              startIcon={<AcceptCall />}
              color="primary"
              className="left__button"
              onClick={acceptCall}
              variant="contained"
            >
              Accept
            </Button>
            {/* <button className="left__button" onClick={acceptCall}>Accept</button>
            <button className="right__button" onClick={rejectCall}>Reject</button> */}
            <Button
              startIcon={<RejectCall />}
              color="primary"
              className="right__button"
              onClick={rejectCall}
              variant="contained"
            >
              Reject
            </Button>
          </div>
        </div>
      )
    }
    
    const video = document.getElementById('pv')
    

      var myVideoStream;
      

      myVideoStream = userVideo?.current?.srcObject || partnerVideo?.current?.srcObject;
      myVideoStream = stream;
      const location = useLocation()
      const history = useHistory()
      // Mute your video
      const muteUnmute = () => {
        console.log(myVideoStream)
        let enabled = myVideoStream?.getAudioTracks()[0]?.enabled ;
        if (enabled){ 
          myVideoStream.getAudioTracks()[0].enabled = false;
          changeMute();
        }
        else{
          changeMute();
          myVideoStream.getAudioTracks()[0].enabled = true;
        }
      }


      const playStop = () => {
        let enabled = myVideoStream?.getVideoTracks()[0]?.enabled; 
        if (enabled){
          myVideoStream.getVideoTracks()[0].enabled = false;
          changeVideo();
        }
        else{
          changeVideo();
          myVideoStream.getVideoTracks()[0].enabled = true;
        }
      }
    
    const changeMute = () => {  
      unMute(!mute);
    }
    const changeVideo = () => {
      setEnableVideo(!enableVideo);
    }
    var muteUnmute_btn_class = mute ? "fas fa-microphone" : "unmute fas fa-microphone-slash";
    var playStop_btn_class = enableVideo ? "fas fa-video" : "stop fas fa-video-slash";

    const reloadVideo= () => {
      if(isAdmin){
        history.push('/admin')
        window.location.reload(false);
      }
      else if (isLogged){
        history.push('/candidate')
        window.location.reload(false);
      }
      
    }


    return (
      <div className="main">
        <div className="main__left">

        <div className="main__videos">
          <div className="video__grid">
            {UserVideo}
          </div>
          <div className="video__grid">
            {PartnerVideo}
          </div>
        </div>

        {/* end of main video */}

        <div className="main__controls">
          <div className="main__controls__block">
            <div  className="main__controls__button main__mute__button">
              
              {/* <i className= {muteUnmute_btn_class} onClick = {muteUnmute}></i> */}
              {mute ? (
                <>
                  <MicIcon  onClick = {muteUnmute} />
                </>
              ):(
                <> 
                <MicOffIcon className = "unmute" onClick = {muteUnmute}/>
                </>
              )}
              <span> {mute ? "Mute" : "UnMute" } </span>
            </div>

            <div  className="main__controls__button main__video__button">
              {/* <i className= {playStop_btn_class} onClick = {playStop}></i> */}
              {enableVideo ? (
                <>
                  <VideocamIcon  onClick = {playStop} />
                </>
              ):(
                <> 
                <VideocamOffIcon className = "stop" onClick = {playStop}/>
                </>
              )}
              <span> {enableVideo ? "Stop Video" : "Play Video" } </span>
              
            </div>
          </div>

         <div className="main__controls__block">
          {Object.keys(users).map(key => {
              
              if (key === yourID ) {
                return null;
              }
              if(isAdmin) {
                return (
                  <Button
                    startIcon={<CallIcon />}
                    onClick={() => callPeer(key)}
                    color="primary"
                    variant="contained"
                  >
                    {isAdmin ? "Call Candidate" : "Call Interviewer"}
                  </Button>
                )
              }
              if(!isAdmin) {
                return (
                  null
                );
              }
            })}
            {incomingCall}
         </div>
          
            
            <div class="main__controls__block">

              <div class="main__controls__button" onClick = {reloadVideo}>
                  {/* <Link to= "/main-menu"> */}
                    <i  class="fas fa-sign-out-alt"></i>
                    {/* <span class= "leave__meeting" onClick = {()=> window.location.reload(false); }> Leave Meeting</span> */}
                    <span class= "leave__meeting"  > Leave Meeting</span>
                  {/* </Link> */}
                  
              </div>
         </div>
       </div>
      </div>
      <div class="main__right">
            <div class="main__header">
                <h1>chat</h1>
            </div>
            <div class="main__chat__window">
                <ul class="messages">

                </ul>
            </div>
            <div class="main__message__container">
                <input type="text" id="chat__message" placeholder="Type Message here" />
            </div>
        </div>
     



    </div>
      
      
  );}
  

export default Call
