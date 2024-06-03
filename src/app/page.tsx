"use client";
import { useEffect, useState } from "react";
import Counter from "./components/counter";
import { HexColorPicker } from "react-colorful";


export default function Home() {
  const [counters, setCounters] = useState<{ id: number; contador:number; color: string; }[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#2596be');

  const handleChangeColor = (newColor: string) => {
    setColor(newColor); 
  };

  const handleButtonClick = () => {
    setShowColorPicker(true);
  }
  useEffect(() => {
    const fetchCounters = async () => {
      try {
        console.log(counters)
        const response = await fetch('/api/counter');
        if (!response.ok) {
          throw new Error('Error fetching counters');
        }
        const data = await response.json();
        setCounters(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching counters:', error);
      }
    };
    fetchCounters();
  }, []);

  const addCounter = async () => {
    setShowColorPicker(false);
    if (counters.length < 10) {
      try {
        const response = await fetch('/api/counter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            color: color 
          })
        });
        if (!response.ok) {
          throw new Error('Error adding counter');
        }
        const data = await response.json();
        console.log("aca", data)
        setCounters([...counters, data]);
        console.log(counters)
      } catch (error) {
        console.error('Error adding counter:', error);
      }
    }
  };

  
  const handleDeleteCounter = async (id: number) => {
    try {
      console.log("a ver",id)
      const response = await fetch(`/api/counter/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting counter');
      }
      setCounters(prevCounters => prevCounters.filter(counter => counter.id !== id));
    } catch (error) {
      console.error('Error deleting counter:', error);
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-3+4">
      <div className="flex p-6 justify-between items-center">
        <h2 className="p-4">
          Máximo 10 contadores
        </h2>
        <button className="px-4 py-2 mr-4 bg-blue-500 text-white rounded" onClick={handleButtonClick}>
        Color
      </button>
        <button className="px-4 py-2  bg-blue-500 text-white rounded" onClick={addCounter}>
          Increment
        </button>
        
      </div>
      {showColorPicker && (<div className="flex justify-center items-center">
      <HexColorPicker color={color} onChange={handleChangeColor} />
    </div>)}
      <div className="mb-8 grid gap-8 text-center m-6">
      {counters.map((counter) => (
        <Counter key={counter.id} id={counter.id} color={counter.color} initialCount={counter.contador} onDelete={handleDeleteCounter}/>
      ))}
      </div>
    </main>

  );
}
