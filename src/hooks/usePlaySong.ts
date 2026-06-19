import { userReproducingSomething } from "../services/user_actions";
import { useAuthStore } from "../store/useAuthStore";
import { usePlayerStore } from "../store/usePlayerStore";
import { Song } from "../types/song";

export const usePlaySong = () => {
  const { userData } = useAuthStore();
  const {
    setCurrentMusic,
    setCurrentSong,
    playMusic,
    togglePlay,
    currentMusic,
  } = usePlayerStore();

  const playUniqueSong = async (id: string, songId: string, type: string) => {
    if (currentMusic.songId === songId && currentMusic.type === type) {
      togglePlay();
      return;
    }

    const data = await userReproducingSomething(userData.token!, id, type);

    setCurrentMusic({
      id: data.id,
      songId: songId,
      type: data.type,
      songs: data.songs,
    });

    const songIndex = data.songs.findIndex((song: Song) => song.id === songId);
    setCurrentSong(songIndex);
    playMusic();
  };

  const playAlbumOrPlaylist = async (
    id: string,
    type: string,
  ) => {
    if (currentMusic.id === id && currentMusic.type === type) {
      togglePlay();
      return;
    }

    const data = await userReproducingSomething(userData.token!, id, type);

    setCurrentMusic({
      id: data.id,
      type: data.type,
      songId: data.songId,
      songs: data.songs,
    });

    setCurrentSong(0);
    playMusic();
  };

  return { playUniqueSong, playAlbumOrPlaylist };
};
