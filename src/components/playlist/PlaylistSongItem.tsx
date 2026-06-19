import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { SongLiked } from "../../types/song";
import { SongLike } from "../song/SongLike";
import { DropdownSongMenu } from "../DropdownSongMenu";
import { usePlaySong } from "../../hooks/usePlaySong";
import { usePlayerStore } from "../../store/usePlayerStore"; // Importante: Añadimos el store
import { MUSIC_TYPES } from "../../utils/constants";
import { PlayingEqualizer } from "../PlayingEqualizer";

type Props = {
  likedSong: SongLiked;
  index: number;
  playlistId: string;
  playlistName: string;
};

export const PlaylistSongItem = ({ likedSong, index, playlistId, playlistName }: Props) => {
  const { playUniqueSong } = usePlaySong();
  const { isPlaying, currentMusic } = usePlayerStore();

  const isCurrentSongLoaded =
    currentMusic?.id === playlistId &&
    currentMusic?.songId === likedSong.song.id;

  const isActuallyPlaying = isCurrentSongLoaded && isPlaying;

  return (
    <tr className={`index-row ${isCurrentSongLoaded ? 'text-green-500' : 'text-gray-300'} text-sm hover:cursor-pointer hover:bg-white/10 group`}>

      <td className="px-4 py-2 whitespace-no-wrap w-12">
        <div className="relative flex items-center justify-start w-6 h-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              playUniqueSong(
                playlistId,
                likedSong.song.id,
                MUSIC_TYPES.PLAYLIST
              );
            }}
            title={`Reproducir ${likedSong.song.name}`}
            className="absolute inset-0 flex items-center justify-start transition-opacity duration-300 z-10 opacity-0 group-hover:opacity-100 pointer-events-auto"
          >
            {isActuallyPlaying
              ? <BsPauseFill className="text-xl text-white" />
              : <BsPlayFill className="text-xl text-white" />
            }
          </button>

          <span className={`absolute font-bold inset-0 flex items-center justify-start pointer-events-none transition-opacity duration-300 text-base ${isCurrentSongLoaded ? 'text-green-500' : 'text-gray-300'} group-hover:opacity-0`}>
            {isActuallyPlaying ? (
              <PlayingEqualizer />
            ) : (
              index + 1
            )}
          </span>
        </div>
      </td>

      <td className="px-4 py-2 whitespace-no-wrap">
        <div className="flex flex-row gap-2 items-center">
          <img
            src={likedSong.album.image}
            className="w-10 h-10 rounded-md"
            alt={likedSong.album.name}
          />
          <div className="flex flex-col">
            <span className={`font-bold ${isCurrentSongLoaded ? 'text-green-500' : 'text-white'}`}>
              {likedSong.song.name}
            </span>
            <p className="text-gray-400">{likedSong.artist.name}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-2 whitespace-no-wrap text-gray-400">
        {likedSong.album.name}
      </td>

      <td>
        <SongLike liked={likedSong.song.liked} songId={likedSong.song.id} />
      </td>

      <td className="px-4 py-2 text-gray-300">{likedSong.song.duration}</td>

      <td>
        <DropdownSongMenu songId={likedSong.song.id} type={MUSIC_TYPES.PLAYLIST} playlistName={playlistName} />
      </td>

    </tr>
  );
};