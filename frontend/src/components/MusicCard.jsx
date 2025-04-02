const MusicCard = ({ title, artist, image }) => {
    return (
      <div className="rounded-lg bg-zinc-800 p-3 shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer">
  <img src={image} alt={title} className="rounded w-full h-40 object-cover" />
  <p className="mt-2 font-medium">{title}</p>
  <p className="text-sm text-zinc-400">{artist}</p>
</div>

    );
  };
  
  export default MusicCard;
  