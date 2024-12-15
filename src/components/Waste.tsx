import { useEffect, useState } from 'react';

function Waste({ waste, value }: { waste: string, value: string }) {
  return (
    <div className="flex-1 max-w-xs mx-3 mb-6 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl flex justify-center items-center"
      style={{
        height: 160,
        width: 360,
        background: "linear-gradient(to right, #6fa3d1, #2ca58d)"
      }}>
      <h1 className="text-4xl text-white font-bold mb-2 text-center">{waste}</h1>
      <p className="text-2l text-white font-bold mb-2 text-center">{value}</p>
    </div>
  );
}

export default Waste;