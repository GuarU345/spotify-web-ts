import { BsBarChartFill, BsPauseFill, BsPlayFill } from "react-icons/bs"
import { usePlaySong } from "../../hooks/usePlaySong"
import { usePlayerStore } from "../../store/usePlayerStore"
import { DropdownSongMenu } from "../DropdownSongMenu"
import { SongLike } from "../song/SongLike"
import { MUSIC_TYPES } from "../../utils/constants"
import { PlayingEqualizer } from "../PlayingEqualizer"

interface SongRowProps {
    song: any,
    index: number
    albumId: string
    artist: string
}

export const AlbumSongItem = ({ song, index, albumId, artist }: SongRowProps) => {
    const { isPlaying, currentMusic } = usePlayerStore();
    const { playUniqueSong } = usePlaySong();

    const isCurrentSongLoaded =
        currentMusic?.id === albumId &&
        currentMusic?.songId === song.id;

    const isActuallyPlaying = isCurrentSongLoaded && isPlaying;

    return (
        <tr
            className="index-row text-sm hover:cursor-pointer hover:bg-white/10 group"
        >
            <td className="px-4 py-2 whitespace-no-wrap w-12">
                <div className="relative flex items-center justify-start w-6 h-6">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            playUniqueSong(albumId, song.id, MUSIC_TYPES.ALBUM);
                        }}
                        title={`Reproducir ${song.name}`}
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
            <td className="px-4 py-2 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className={`font-bold ${isCurrentSongLoaded ? 'text-green-500' : 'text-gray-300'}`}>{song.name}</span>
                    <p className="text-gray-400">{artist}</p>
                </div>
                <SongLike liked={song.liked} songId={song.id} />
            </td>
            <td className="px-4 py-2 text-gray-300">{song.duration}</td>
            <td>
                <DropdownSongMenu songId={song.id} type={MUSIC_TYPES.ALBUM} playlistName={""} />
            </td>
        </tr>
    )
}
