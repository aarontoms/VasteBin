
function Waste({ waste, value, created_at }: { waste: string, value: string, created_at: string }) {
  return (
    <div>
      <style>{`
        .hover-scale {
          transform: scale(1);
          transition: transform 0.2s ease-in-out;
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
      `}</style>
      <div className="min-w-[90vw] px-4 py-1 rounded-sm transform transition-transform flex justify-between items-center overflow-clip animate-fly-in border-b-2 border-t-2 border-gray-800 hover:bg-gray-800 hover-scale">

        <h1 className="text-2xl text-gray-200 font-semibold mb-2">{waste}</h1>
        <p className="text-2l text-white font-bold mb-2 text-center hidden">{value}</p>
        {<p className="text-sm text-gray-400 font-thin mb-2"> {created_at} </p>}
      </div>
    </div>
  );
}

export default Waste;