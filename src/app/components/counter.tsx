"use client";

import React, { useState } from 'react';

interface CounterProps {
  initialCount: number;
  id: number;
  color: string;
  onDelete: (id: number) => void;
}

const Counter: React.FC<CounterProps> = ({ initialCount ,id, onDelete, color}) => {
  const [count, setCount] = useState(initialCount);

  const increment = async () => {
    setCount(count + 1);
    try {
      const response = await fetch(`/api/counter/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: "increment"
        })
      });
      if (!response.ok) {
        throw new Error('Error updating counter');
      } else {
        const data = await response.json();
        setCount(data.contador)
      }
    } catch (error) {
      console.error('Error updating counter:', error);
    }
  };

  const decrement = async () => {
    if (count > 0) {
      setCount(count - 1);
      try {
        const response = await fetch(`/api/counter/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: "decrement"
          })
        });
        if (!response.ok) {
          throw new Error('Error updating counter');
        } else {
          const data = await response.json();
          setCount(data.contador)
        }
      } catch (error) {
        console.error('Error updating counter:', error);
      }
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="mb-8  border p-4 sm:grid-cols-2" style={{ backgroundColor: color }}>
      <div className='justify-normal'>
      <h2 className="mb-3 text-2xl font-semibold">
          Counter
        </h2>
      </div>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">
        {count}
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={increment}>
          Increment
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={decrement}>
          Decrement
        </button>
      </div>
      <button className="px-4 py-2 mt-2 bg-white text-black rounded w-[100%]" onClick={handleDelete}>
          Delete
      </button>
    </div>

  );
}

export default Counter;
