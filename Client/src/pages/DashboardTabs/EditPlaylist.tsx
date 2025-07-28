import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, SkeletonLoadingBlock } from "../../Components/UI";
import { DEFAULT_PLAYLIST_IDS } from "../../utils/constants";
import { Playlist } from "../../utils/types";

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const {
    getPlaylists,
    userPlaylists,
    isLoading,
    showAlert,
    alertText,
    alertType,
    displayAlert,
    clearAlert,
    updatePlaylist,
    deletePlaylist,
    createPlaylist,
  } = useAppContext();

  const [values, setValues] = useState({
    title: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = values;

    if (!title) {
      displayAlert();
      return;
    }

    createPlaylist(title);
    setValues({ title: "" });
  };

  const handlePlaylistUpdate = (playlist: Playlist) => {
    updatePlaylist(playlist);
  };

  const handlePlaylistDelete = (playlistId: string) => {
    deletePlaylist(playlistId);
  };

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
      <div className="form">
        <h3>{t("edit_playlist.title")}</h3>
        {showAlert && <Alert />}
        <form onSubmit={onSubmit}>
          <div className="form-center">
            <FormRow
              type="text"
              name="title"
              value={values.title}
              handleChange={handleChange}
              labelText={t("edit_playlist.playlist_title")}
            />
            <button type="submit" className="btn btn-block">
              {t("edit_playlist.create_playlist")}
            </button>
          </div>
        </form>
      </div>

      <PlaylistsContainer>
        <h4>{t("edit_playlist.your_playlists")}</h4>
        {userPlaylists.map((playlist: Playlist) => {
          const isDefaultPlaylist = DEFAULT_PLAYLIST_IDS.includes(playlist.id);
          return (
            <PlaylistCard key={playlist.id}>
              <PlaylistInfo>
                <PlaylistTitle>{playlist.title}</PlaylistTitle>
                <PlaylistDate>
                  {new Date(playlist.createdAt).toLocaleDateString()}
                </PlaylistDate>
              </PlaylistInfo>
              <PlaylistActions>
                {!isDefaultPlaylist && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handlePlaylistDelete(playlist.id)}
                  >
                    {t("edit_playlist.delete")}
                  </button>
                )}
                <span className="playlist-id">ID: {playlist.id}</span>
              </PlaylistActions>
            </PlaylistCard>
          );
        })}
      </PlaylistsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  padding: 2rem;
`;

const PlaylistsContainer = styled.div`
  margin-top: 3rem;

  h4 {
    margin-bottom: 2rem;
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

const PlaylistActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .playlist-id {
    font-size: 0.75rem;
    color: var(--grey-500);
    font-family: monospace;
  }
`;

export default Profile;
