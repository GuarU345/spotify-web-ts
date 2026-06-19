import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { usePlayerStore } from "../../store/usePlayerStore";
import { usePlaySong } from "../../hooks/usePlaySong";

type Props = {
  id: string;
  type: string;
};

export const CardPlayButton = ({ id, type }: Props) => {
  const { currentMusic, isPlaying } = usePlayerStore();
  const isPlayingAlbumOrPlaylist = isPlaying && currentMusic?.id === id && currentMusic.type === type;
  const { playAlbumOrPlaylist } = usePlaySong();

  return (
    <button
      onClick={() => playAlbumOrPlaylist(id, type)}
      className="rounded-full bg-green-500 p-3 text-2xl text-black hover:scale-105 hover:bg-green-400"
    >
      {isPlayingAlbumOrPlaylist ? <BsPauseFill /> : <BsPlayFill />}
    </button>
  );
};
