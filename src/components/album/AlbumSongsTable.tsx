import { IoTimeOutline } from "react-icons/io5";
import { LikedSongs } from "../../types/song";
import { useParams } from "react-router-dom";
import { AlbumSongItem } from "./AlbumSongItem";

type Props = {
  songs: LikedSongs[];
  artist: string;
};

export const AlbumSongsTable = ({ songs, artist }: Props) => {
  const { albumId } = useParams();

  return (
    <table className="table-auto min-w-full text-left divide-y divide-gray-100/50">
      <thead>
        <tr className="text-gray-300 text-sm">
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Titulo</th>
          <th className="px-4 py-2">
            <span className="text-xl">
              <IoTimeOutline />
            </span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {songs?.map((song, index) => (
          <AlbumSongItem 
          key={song.id} 
          song={song} 
          index={index} 
          albumId={albumId!}
          artist={artist}
          />
        ))}
      </tbody>
    </table>
  );
};
