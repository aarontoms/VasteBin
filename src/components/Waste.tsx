import { useEffect, useState } from 'react';

function Waste({ waste, value, created_at }: { waste: string, value: string, created_at: string }) {
  return (
    <div className="min-w-[90vw] mb-1 px-3 rounded-sm shadow-lg transform transition-transform flex justify-between overflow-clip animate-fly-in border-2 border-gray-700 "
      style={{
        // background: "linear-gradient(to right, #6fa3d1, #2ca58d)",
        
      }}>
      <h1 className="text-3xl text-gray-200 font-semibold mb-2">{waste}</h1>
      {/* <p className="text-2l text-white font-bold mb-2 text-center">{value}</p> */}
      { <p className="text-2l text-gray-200 font-thin mb-2"> {created_at} </p>}
    </div>
  );
}

export default Waste;