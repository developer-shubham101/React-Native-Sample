import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://15.207.60.89:18036" //"http://127.0.0.1:4001";

function SocketioExample() {
  const [response, setResponse] = useState("");

  useEffect(() => {

    const socket = socketIOClient(ENDPOINT);
    console.log('useEffect', socket);
    socket.on("DEPTH_CHANGE", data => {
      console.log('msbhdblabdsabshj', { data });

    });
    console.log('useEffect---',);

    socket.on("disconnect", () => {
      console.log('disconnect', socket.id); // undefined
    });

    socket.on("connect", () => {
      console.log('connect', socket.id); // x8WIv7-mJelg7on_ALbx
    });
    setTimeout(() => {
      console.log('setTimeout', socket);
    }, 3000);
  }, []);

  return (
    <SafeAreaView>

    </SafeAreaView>
  );
}

export default SocketioExample;