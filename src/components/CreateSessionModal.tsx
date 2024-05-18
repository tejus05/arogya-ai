"use client"

import React from 'react'
import { Button } from './ui/button'
import { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      // @ts-ignore
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      // @ts-ignore
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // @ts-ignore
    hours = String(hours).padStart(2, "0");
    // @ts-ignore
    minutes = String(minutes).padStart(2, "0");
    // @ts-ignore
    seconds = String(seconds).padStart(2, "0");
    // @ts-ignore
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="flex flex-col items-center bg-gray-200 w-full h-full">
      <div className="flex flex-col items-center border-4 rounded-full bg-white p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
        <div className="text-4xl font-mono font-bold text-gray-700 text-shadow mb-6">
          {formatTime()}
        </div>
        <div className="space-x-7 flex items-center">
          <button
            onClick={start}
            className="text-xs font-bold px-2 py-2 border-none rounded-lg cursor-pointer text-white bg-green-600 transition-colors duration-500 ease-in-out hover:bg-green-700"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="text-xs font-bold px-2 py-2 border-none rounded-lg cursor-pointer text-white bg-red-500 transition-colors duration-500 ease-in-out hover:bg-red-600"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="text-xs font-bold px-2 py-2 border-none rounded-lg cursor-pointer text-white bg-blue-400 transition-colors duration-500 ease-in-out hover:bg-blue-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}




const CreateSessionModal = () => {
  return (
    <div className='bg-blue-300 flex justify-center items-center flex-col w-full h-full'>
      <div>
        <Stopwatch/>
      </div>
    </div>
  )
}

export default CreateSessionModal