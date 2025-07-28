import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { SkeletonLoadingBlock } from "../../Components/UI";
import { Alert } from "../../Components/UI";
import { Playlist } from "../../utils/types";

const MyAnimes = () => {
  const { t } = useTranslation();
  const { getPlaylists, userPlaylists, isLoading, showAlert } = useAppContext();

  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  if (isLoading) {
    return (
      <Wrapper>
        <SkeletonLoadingBlock height={200} width="100%" borderRadius={8} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3>{t("top_animes.title")}</h3>
      {showAlert && <Alert />}

      <PlaylistsContainer>
        <h4>{t("top_animes.select_playlist")}</h4>
        {userPlaylists.map((playlist: Playlist) => (
          <PlaylistCard key={playlist.id}>
            <PlaylistInfo>
              <PlaylistTitle>{playlist.title}</PlaylistTitle>
              <PlaylistDate>
                {new Date(playlist.createdAt).toLocaleDateString()}
              </PlaylistDate>
            </PlaylistInfo>
            <PlaylistId>ID: {playlist.id}</PlaylistId>
          </PlaylistCard>
        ))}
      </PlaylistsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  padding: 2rem;
`;

const PlaylistsContainer = styled.div`
  margin-top: 2rem;

  h4 {
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: var(--grey-900);
  }
`;

const PlaylistCard = styled.div`
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--borderRadius);
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow);
  }
`;

const PlaylistInfo = styled.div`
  flex: 1;
`;

const PlaylistTitle = styled.h5`
  font-weight: 600;
  color: var(--grey-900);
  margin-bottom: 0.5rem;
`;

const PlaylistDate = styled.p`
  color: var(--grey-600);
  font-size: 0.875rem;
`;

const PlaylistId = styled.span`
  font-size: 0.75rem;
  color: var(--grey-500);
  font-family: monospace;
`;

export default MyAnimes;
