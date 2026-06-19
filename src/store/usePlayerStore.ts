import { create } from "zustand";
import { Howl } from "howler";
import { STREAMSONGS } from "../utils/constants";
import { PlaylistSong } from "../types/song";
import { Song } from "../types/playlist";
import { isUndefined } from "../utils/functions";

interface CurrentMusic {
  id: string | null;
  songId: string | null;
  type: string | null;
  songs: PlaylistSong[] | Song[] | null;
}

interface State {
  sound: Howl | null;
  isPlaying: boolean;
  volume: number;
  duration: string | null;
  progress: string | null;
  currentMusic: CurrentMusic;
  currentSong: number;
}

interface Actions {
  setIsPlaying: (state: boolean) => void;
  setVolume: (state: number) => void;
  setCurrentMusic: (state: CurrentMusic) => void;
  setCurrentSong: (state: number | undefined) => void;
  setProgress: (state: string | null) => void;
  playMusic: () => void;
  togglePlay: () => void;
  changeSong: (action: "next" | "previous") => void;
  changeVolume: (state: number) => void;
}

export const usePlayerStore = create<State & Actions>((set, get) => ({
  sound: null,
  isPlaying: false,
  volume: 0.1,
  duration: null,
  progress: null,
  currentMusic: { id: null, songId: null, type: null, songs: null },
  currentSong: 0,

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setCurrentMusic: (currentMusic) => {
    const { currentMusic: prevMusic, sound } = get()

    const isDifferentMusic = currentMusic.id !== prevMusic.id || currentMusic.songId !== prevMusic.songId

    if (isDifferentMusic && sound) {
      sound.unload()
      set({ duration: null, progress: null, sound: null })
    }

    set({ currentMusic })
  },
  setCurrentSong: (currentSong) => set({ currentSong }),
  setProgress: (progress) => set({ progress }),
  playMusic: async () => {
    const { currentMusic, currentSong, volume, changeSong } = get();
    const { songs } = currentMusic;
    const findSong = songs![currentSong];
    const foundSong = STREAMSONGS.find(
      (streamsong) => streamsong.name === findSong.name
    );

    if (isUndefined(foundSong)) throw new Error();

    const { track } = foundSong;

    const newSound = new Howl({
      src: [track],
      volume,
      html5: true,
      onloaderror: (error) => {
        console.error("Error durante la carga:", error);
      },
      onplayerror: (error) => {
        console.error("Error durante la reproducción:", error);
      },
    });

    newSound.on("load", () => {
      const newDuration = newSound.duration();
      set({ duration: newDuration });
    });

    newSound.on("end", () => {
      changeSong("next")
    })

    newSound.play();
    set({ sound: newSound, isPlaying: true });
  },
  togglePlay: () => {
    const { sound, isPlaying } = get();

    if (!sound) return;

    if (isPlaying) {
      sound.pause();
      set({ isPlaying: false });
    } else {
      sound.play();
      set({ isPlaying: true });
    }
  },
  changeSong(action: "next" | "previous") {
    const { currentMusic, currentSong, playMusic, sound } = get();
    const songs = currentMusic.songs;

    if (!songs || songs.length === 0) return;

    if (sound) sound.unload();

    const newSongIndex = action === "next"
      ? (currentSong + 1) % songs.length
      : (currentSong - 1 + songs.length) % songs.length;

    set({
      currentSong: newSongIndex,
      currentMusic: {
        ...currentMusic,
        songId: songs[newSongIndex].id
      },
      duration: null,
      progress: null
    });

    playMusic();
  },
  changeVolume: (volume) => {
    const { sound } = get();
    if (sound !== null) {
      sound.volume(volume);
    }
  }
}));
