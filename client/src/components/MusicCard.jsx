const MusicCard = ({ title, artist, image }) => {
    return (
      <div className="bg-zinc-800 p-4 rounded-lg shadow hover:bg-zinc-700 transition duration-200">
        <img src={image} alt={title} className="rounded w-full h-40 object-cover" />
        <p className="mt-2 text-sm font-medium">{title}</p>
        <p className="text-xs text-zinc-400">{artist}</p>
      </div>
    );
  };
  
  export default MusicCard;
  