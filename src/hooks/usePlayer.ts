import { usePlayerStore } from "../store/usePlayerStore";

export const usePlayer = () => {
  const { togglePlay, changeSong } =
    usePlayerStore();

  const handlePlay = () => {
    togglePlay()
  };

  const handleNextSong = () => {
    changeSong("next")
  };

  const handlePreviousSong = () => {
    changeSong("previous")
  };

  return { handleNextSong, handlePreviousSong, handlePlay };
};
