"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [evtSource, setEvtSource] = useState<EventSource | null>(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const _evtSource = new EventSource("http://localhost:4000/sse");
    setEvtSource(_evtSource);
    return () => _evtSource.close();
  }, []);

  useEffect(() => {
    if (!evtSource) return;
    evtSource.onmessage = (event) => {
      console.log(event);
    };
  }, [evtSource]);

  const handleClick = async () => {
    await axios.post("http://localhost:4000/price", { price });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="border-2 border-gray-500 text-black"
      />
      <button className="bg-blue-500 px-4 py-2" onClick={handleClick}>
        send
      </button>
    </div>
  );
}
