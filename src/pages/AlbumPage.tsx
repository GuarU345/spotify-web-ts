import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect } from "react";
import { AlbumSongsTable } from "../components/album/AlbumSongsTable";
import { CardPlayButton } from "../components/player/CardPlayButton";
import { AlbumLike } from "../components/album/AlbumLike";
import { useAuthStore } from "../store/useAuthStore";
import { useFetchAlbumData } from "../hooks/useFetchAlbums";
import { MUSIC_TYPES } from "../utils/constants";
import { Banner } from "../components/Banner";

export const AlbumPage = () => {
  const { albumId } = useParams();
  const { userData } = useAuthStore();

  const {
    data: album,
    isLoading,
    refetch,
  } = useFetchAlbumData(userData.token!, albumId!, userData.user_id!);

  useEffect(() => {
    refetch();
  }, [albumId]);

  return (
    <Layout>
      {isLoading && (
        <>
          <p>Loading...</p>
        </>
      )}
      <div
        style={{
          background: `linear-gradient(to bottom,${album?.color ? album.color : "#18181b"} 10%,#18181b 45%)`,
        }}
        className={`relative flex flex-col h-full overflow-x-hidden z-10`}
      >
        <Banner
          image={album?.image}
          legend={album?.type}
          length={album?.songs.length}
          subparagraph={album?.artist}
          title={album?.name}
          color={album?.color}
        />
        <div className="mt-10 px-6 flex gap-10 items-center">
          <CardPlayButton id={albumId!} type={MUSIC_TYPES.ALBUM} />
          <AlbumLike albumId={albumId!} />
        </div>

        <section className="p-6">
          <AlbumSongsTable songs={album?.songs} artist={album?.artist} />
        </section>
      </div>
    </Layout>
  );
};
