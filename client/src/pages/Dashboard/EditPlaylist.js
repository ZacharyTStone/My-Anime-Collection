import { useEffect, useState } from "react";
import { FormRow, FormRowSelect } from "../../Components";
import { Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import pokemon from "../../assets/images/pokemon.png";
import { BiCoffeeTogo } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t } = useTranslation();
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    getPlaylists,
    updatePlaylist,
    deletePlaylist,
    createPlaylist,
    isLoading,
    deleteUser,
    logoutUser,
    userPlaylists,
    currentPlaylist,
    handlePlaylistChange,
  } = useAppContext();

  const [title, setTitle] = useState(currentPlaylist.title);
  const [newTitle, setNewTitle] = useState("");
  const [id, setId] = useState(currentPlaylist.id);

  useEffect(() => {
    getPlaylists();
    console.log(userPlaylists, "userPlaylists in use effect");
  }, []);

  const handleSubmit = (e) => {
    console.log("handleSubmit");
  };

  const handleClickOnPlaylist = async (title) => {
    console.log("handleClickOnPlaylist");
    console.log(title);
    // find the playlist with the title
    const playlist = userPlaylists.find((playlist) => playlist.title === title);
    // update the current playlist
    console.log(playlist, "playlist");
    if (!playlist) {
      showAlert(t("profile.playlist_not_found"));
      return;
    }
    setTitle(playlist.title);
    setId(playlist.id);
    await handlePlaylistChange({ name: playlist.id, value: playlist.title });
  };

  const handleNewPlaylistSubmit = async (e) => {
    e.preventDefault();
    const numberOfPlaylists = userPlaylists.length;
    await createPlaylist(`Default ${numberOfPlaylists + 1}`);
    setNewTitle("");
    await getPlaylists();
  };

  const handlePlaylistEdit = async (e) => {
    e.preventDefault();
    console.log("handlePlaylistEdit");

    console.log(title, id);

    await updatePlaylist({
      title: title,
      id: id,
    });
    await getPlaylists();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handlePlaylistEdit}>
        <h3>{t("Edit_Playlist.title")}</h3>
        {showAlert && <Alert />}
        <div className="form-left">
          <ul>
            {userPlaylists.map((playlist) => (
              <li
                onClick={() => handleClickOnPlaylist(playlist.title)}
                className={playlist.title === title ? "active" : ""}
              >
                {playlist.title ? playlist.title : "(Title N/A"}

                <button
                  onClick={async () => {
                    await deletePlaylist(playlist.id);
                    setTitle("");
                    setId("");
                  }}
                >
                  <BiCoffeeTogo />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            value={title}
            labelText={t("Edit_Playlist.name")}
            handleChange={(e) => setTitle(e.target.value)}
          />

          <button
            className="btn btn-block btn-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? t("profile.wait") : t("profile.save")}
          </button>
        </div>
      </form>
      <form className="form" onSubmit={handleNewPlaylistSubmit}>
        <h3>{t("Edit_Playlist.create")}</h3>
        {showAlert && <Alert />}
        <div className="form-left"></div>

        <div className="form-center">
          <FormRow
            type="text"
            name="newTitle"
            value={newTitle}
            labelText={t("Edit_Playlist.create")}
          />

          <button
            className="btn btn-block btn-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? t("profile.wait") : t("profile.save")}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .active {
    background-color: #f5f5f5;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .btn-hipster:hover {
    background-color: var(--primary-50);
    color: var(--primary-100);
    border-color: var(--primary-500);
  }

  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .btn-danger {
    position: relative;
    :hover {
      color: white;
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
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .pokemon {
    display: none;
    width: 200px;
    height: auto;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
    .pokemon {
      display: block;
      position: relative;
      left: 75%;
      top: -2rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Profile;
