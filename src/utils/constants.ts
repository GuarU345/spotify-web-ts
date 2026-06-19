const isProd = false

export const API_URL = isProd ? import.meta.env.VITE_API_PROD_URL : "http://localhost:3000/api";

export const INITIAL_PLAYLIST_NAME = "Canciones que te gustan";

export const MUSIC_TYPES = {
  ALBUM: "album",
  PLAYLIST: "playlist",
  SONG: "song",
};

export const STREAMSONGS = [
  {
    name: "LUNA",
    track: "/songs/LUNA.mp3",
  },
  {
    name: "RUBICON",
    track: "/songs/RUBICON.mp3",
  },
  {
    name: "CARNAL",
    track: "/songs/CARNAL.mp3",
  },
  {
    name: "LADY GAGA",
    track: "/songs/LADYGAGA.mp3",
  },
  {
    name: "NUEVA VIDA",
    track: "/songs/NUEVAVIDA.mp3",
  },
  {
    name: "Polaroid",
    track: "/songs/Polaroid.mp3",
  },
  {
    name: "Gold",
    track: "/songs/Gold.mp3",
  },
  {
    name: "Shots",
    track: "/songs/Shots.mp3",
  },
  {
    name: "Dream",
    track: "/songs/Dream.mp3",
  },
  {
    name: "Hopeless Opus",
    track: "/songs/HopelessOpus.mp3",
  },
  {
    name: "PERDISTE EL EMMY",
    track: "/songs/PERDISTEELEMMY.mp3",
  },
  {
    name: "PIENSO EN TI",
    track: "/songs/PIENSOENTI.mp3",
  },
  {
    name: "INAROW62",
    track: "/songs/INAROW62.mp3",
  },
  {
    name: "NO PODEMOS SER AMIGOS",
    track: "/songs/NOPODEMOSSERAMIGOS.mp3",
  },
  {
    name: "OVELNAIT",
    track: "/songs/OVELNAIT.mp3",
  },
  {
    name: "Desenfocao'",
    track: "/songs/Desenfocao.mp3",
  },
  {
    name: "Sexo Virtual",
    track: "/songs/SexoVirtual.mp3",
  },
  {
    name: "Desesperados",
    track: "/songs/Desesperados.mp3",
  },
  {
    name: "Cosa Guapa",
    track: "/songs/CosaGuapa.mp3",
  },
  {
    name: "La Old Skul",
    track: "/songs/LaOldSkul.mp3",
  },
  {
    name: "BLOOD",
    track: "/songs/BLOOD.mp3",
  },
  {
    name: "DNA",
    track: "/songs/DNA.mp3",
  },
  {
    name: "ELEMENT",
    track: "/songs/ELEMENT.mp3",
  },
  {
    name: "FEEL",
    track: "/songs/FEEL.mp3",
  },
  {
    name: "DUCKWORTH",
    track: "/songs/DUCKWORTH.mp3",
  },
];


