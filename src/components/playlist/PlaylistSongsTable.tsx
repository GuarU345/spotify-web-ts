import { IoTimeOutline } from "react-icons/io5";
import { PlaylistSongItem } from "./PlaylistSongItem";
import { CardPlayButton } from "../player/CardPlayButton";
import { useParams } from "react-router-dom";
import { MUSIC_TYPES } from "../../utils/constants";
import { EmptyPlaylist } from "./EmptyPlaylist";
import { DropdownPlaylistMenu } from "../DropdownPlaylistMenu";
import { onlyCreatedPlaylistsCanBeModified } from "../../utils/functions";

export const PlaylistSongsTable = ({ songs, playlistName }) => {
  const { playlistId } = useParams();

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center gap-4">
        {songs?.length > 0 && <div className="rounded-full w-[50px] h-[50px] bg-green-500 grid place-content-center hover:scale-105">
          <CardPlayButton id={playlistId!} type={MUSIC_TYPES.PLAYLIST} />
        </div>}
        <div>
          {onlyCreatedPlaylistsCanBeModified(playlistName) && <DropdownPlaylistMenu playlistId={playlistId!} />}
        </div>
      </section>
      {songs?.length === 0 && onlyCreatedPlaylistsCanBeModified(playlistName) ? (
        <EmptyPlaylist />
      ) : (
        <>
          <table className="min-w-full table-auto text-left divide-y divide-gray-100/50">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Titulo</th>
                <th className="px-4 py-2">Álbum</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">
                  <IoTimeOutline />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {songs?.map((song, index: number) => (
                <PlaylistSongItem
                  key={song.song.id}
                  likedSong={song}
                  index={index}
                  playlistId={playlistId!}
                  playlistName={playlistName}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
