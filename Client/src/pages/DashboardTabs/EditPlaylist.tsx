import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, SkeletonLoadingBlock } from "../../Components/UI";
import { DEFAULT_PLAYLIST_IDS } from "../../utils/constants";

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const {
    getPlaylists,
    updatePlaylist,
    deletePlaylist,
    createPlaylist,
    isLoading,
    userPlaylists,
    currentPlaylist,
    handlePlaylistChange,
    loadingFetchPlaylists,
    showAlert,
  } = useAppContext();

  const [newTitle, setNewTitle] = useState("");
  const [id, setId] = useState("");

  interface IPlaylist {
    id: string;
    title: string;
  }

  const handleClickOnPlaylist = async (playlistId: string) => {
    if (isLoading) return;
    const playlist = userPlaylists.find(
      (playlist: IPlaylist) => playlist.id === playlistId
    );
    if (!playlist) return;
    await handlePlaylistChange({ name: playlist.id, value: playlist.id });
    setNewTitle(playlist.title);
    setId(playlist.id);
  };

  useEffect(() => {
    getPlaylists();
    setId(currentPlaylist.id);
  }, []);

  const handleNewPlaylistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const numberOfPlaylists = userPlaylists.length - 1;
    await createPlaylist(`New Playlist #`);
    setNewTitle(userPlaylists[numberOfPlaylists].title);
    setId(userPlaylists[numberOfPlaylists].id);
  };

  const handlePlaylistEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    await updatePlaylist({
      title: newTitle,
      id: id,
    });
    await getPlaylists();
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      await deletePlaylist(playlistId);
      setNewTitle("");
      setId("");
    }
  };

  if (isLoading || loadingFetchPlaylists) {
    return (
      <SkeletonLoadingBlock height={500} width={"100%"} borderRadius={8} />
    );
  }

  return (
    <Wrapper>
      <div className="profile-container">
        {showAlert && <Alert />}
        <h3>{t("edit_playlist.title")}</h3>
        <div className="form-left">
          <ul>
            {userPlaylists.map((playlist: IPlaylist) => (
              <li key={playlist.id}>
                <span
                  onClick={() => handleClickOnPlaylist(playlist.id)}
                  className="playlist-title"
                >
                  {playlist.id === currentPlaylist.id && (
                    <AiOutlineArrowRight size={20} className="arrow-icon" />
                  )}
                  {playlist.title}
                  {!DEFAULT_PLAYLIST_IDS.includes(currentPlaylist.id) &&
                    playlist.id === currentPlaylist.id && (
                      <span
                        className="delete-icon"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                      >
                        <AiFillDelete size={20} className="delete-icon" />
                      </span>
                    )}
                </span>
              </li>
            ))}
          </ul>
          <button
            className="btn"
            onClick={handleNewPlaylistSubmit}
            disabled={isLoading}
          >
            {t("edit_playlist.new_playlist")}
          </button>
        </div>
      </div>
      <hr />
      {id && DEFAULT_PLAYLIST_IDS.includes(id) ? (
        <div className="form-left">
          <p>{t("edit_playlist.cta")}</p>
        </div>
      ) : (
        <form className="form" onSubmit={handlePlaylistEdit}>
          <div className="form-center">
            <FormRow
              type="text"
              name="title"
              value={newTitle}
              labelText="Edit Playlist Title"
              handleChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t("profile.wait") : t("profile.save")}
            </button>
          </div>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);

  .playlist-title {
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .arrow-icon {
    color: var(--primary-400);
    font-size: 1rem;
  }

  .delete-icon {
    display: inline-flex;
    color: red;
    font-size: 1.5rem;
    margin-left: 1rem;
    cursor: pointer;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      column-gap: 1rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: repeat(3, 1fr);
    }

    .form-center button {
      margin-top: 0;
    }
  }

  hr {
    border: 1px solid #ccc;
    margin: 1rem 0;
  }
`;

export default Profile;
