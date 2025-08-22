import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import { usePlaylistContext } from "../../context/PlaylistContext";
import { FormRow, Alert, SkeletonLoadingBlock } from "../../Components/UI";
import { DEFAULT_PLAYLIST_IDS } from "../../utils/constants";
import { IPlaylist } from "../../utils/types";

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const {
    getPlaylists,
    updatePlaylist,
    deletePlaylist,
    createPlaylist,
    userPlaylists,
    currentPlaylist,
    handlePlaylistChange,
    loadingFetchPlaylists,
  } = usePlaylistContext();
  
  const [newTitle, setNewTitle] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<
    undefined | string
  >(undefined);

  const handleClickOnPlaylist = async (playlistId: string) => {
    const playlist = userPlaylists.find(
      (playlist: IPlaylist) => playlist.id === playlistId
    );
    if (!playlist) return;
    if (playlist.id) {
      await handlePlaylistChange({ value: playlist.id });
    }
    setNewTitle(playlist.title);
    setSelectedPlaylistId(playlist.id);
  };

  useEffect(() => {
    getPlaylists();
    setSelectedPlaylistId(currentPlaylist.id);
  }, [getPlaylists, currentPlaylist.id]);

  const handleNewPlaylistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numberOfPlaylists = userPlaylists.length - 1;
    await createPlaylist(`New Playlist #`);
    setNewTitle(userPlaylists[numberOfPlaylists].title);
    setSelectedPlaylistId(userPlaylists[numberOfPlaylists].id);
  };

  const handlePlaylistEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlaylistId) {
      const playlist = userPlaylists.find((p) => p.id === selectedPlaylistId);
      if (playlist) {
        await updatePlaylist({ ...playlist, title: newTitle });
        await getPlaylists();
      }
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      await deletePlaylist(playlistId);
      setNewTitle("");
      setSelectedPlaylistId(undefined);
    }
  };

  if (loadingFetchPlaylists) {
    return (
      <SkeletonLoadingBlock height={500} width={"100%"} borderRadius={8} />
    );
  }

  return (
    <Wrapper>
      <div className="profile-container">

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
              disabled={false}
            >
              {t("edit_playlist.new_playlist")}
            </button>
        </div>
      </div>
      <hr />

      <div className="form-left">
        <p className="helper-text">{t("edit_playlist.cta")}</p>
      </div>
      {currentPlaylist.id &&
        !!selectedPlaylistId &&
        // not default playlist
        !DEFAULT_PLAYLIST_IDS.includes(selectedPlaylistId) && (
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
                disabled={false}
              >
                                  {t("profile.save")}
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
  box-shadow: var(--shadow);

  h3 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 600;
    color: var(--grey-900);
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: -0.75rem;
      left: 0;
      width: 4rem;
      height: 3px;
      background-color: var(--primary-500);
      border-radius: 2px;
    }
  }

  .profile-container {
    margin-bottom: 2rem;
  }

  .playlist-title {
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: var(--borderRadius);
    transition: all 0.2s ease;
    border: 1px solid transparent;

    &:hover {
      background-color: var(--grey-50);
      border-color: var(--grey-200);
    }
  }

  li {
    list-style: none;
  }

  ul {
    margin-bottom: 1.5rem;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid var(--grey-200);
    border-radius: var(--borderRadius);
    padding: 0.5rem;
    background-color: var(--white);
    box-shadow: var(--shadow-sm) inset;
  }

  .arrow-icon {
    color: var(--primary-500);
    font-size: 1.25rem;
  }

  .delete-icon {
    display: inline-flex;
    color: var(--red-dark);
    font-size: 1.25rem;
    cursor: pointer;
    margin-left: auto;
    opacity: 0.7;
    transition: all 0.2s ease;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
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
    background-color: var(--grey-50);
    padding: 1.5rem;
    border-radius: var(--borderRadius);
    border: 1px solid var(--grey-200);
    margin-top: 1.5rem;
  }

  .form-center button {
    align-self: end;
    height: 42px;
    margin-top: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--grey-200);
    margin: 1.5rem 0;
  }

  .form-left p {
    font-size: 0.9rem !important;
    color: var(--grey-600);
    margin-bottom: 1rem;
    font-style: italic;
    text-decoration: none !important;
    position: relative;
    display: inline-block;

    &:after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--grey-300);
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr auto;
      align-items: end;
      column-gap: 1rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr auto;
    }
  }
`;

export default Profile;
