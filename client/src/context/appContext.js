import React, { useReducer, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import reducer from "./reducer";
import axios from "axios";
import { toast } from "react-toastify";
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	DELETE_USER_BEGIN,
	DELETE_USER_SUCCESS,
	DELETE_USER_ERROR,
	HANDLE_CHANGE,
	HANDLE_PLAYLIST_CHANGE,
	CLEAR_VALUES,
	CREATE_ANIME_BEGIN,
	CREATE_ANIME_SUCCESS,
	CREATE_ANIME_ERROR,
	CREATE_PLAYLIST_BEGIN,
	CREATE_PLAYLIST_SUCCESS,
	CREATE_PLAYLIST_ERROR,
	UPDATE_PLAYLIST_BEGIN,
	UPDATE_PLAYLIST_SUCCESS,
	UPDATE_PLAYLIST_ERROR,
	GET_ANIMES_BEGIN,
	GET_ANIMES_SUCCESS,
	GET_ANIMES_ERROR,
	FETCH_ANIMES_BEGIN,
	FETCH_ANIMES_SUCCESS,
	FETCH_ANIMES_ERROR,
	GET_PLAYLIST_BEGIN,
	GET_PLAYLIST_SUCCESS,
	GET_PLAYLIST_ERROR,
	CHANGE_DEFAULT_PLAYLIST_POLICY,
	DELETE_ANIME_BEGIN,
	DELETE_ANIME_SUCCESS,
	DELETE_PLAYLIST_BEGIN,
	DELETE_PLAYLIST_SUCCESS,
	DELETE_PLAYLIST_ERROR,
	CLEAR_FILTERS,
	CHANGE_PAGE,
	CHANGE_SITE_LANGUAGE,
	CHANGE_THEME,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	theme: user ? JSON.parse(user).theme : "light",
	token: token,
	animes: [],
	totalAnimes: 0,
	numOfPages: 1,
	page: 1,
	search: "",
	searchStatus: "all",
	searchStared: "all",
	searchType: "all",
	sort: "latest",
	currentPlaylist: user
		? user.playlist
		: {
				title: "default",
				id: "0",
		  },
	userPlaylists: [],
	sortOptions: [
		{
			title: "Latest",
			value: "latest",
		},
		{
			title: "Oldest",
			value: "oldest",
		},
		{
			title: "A - Z",
			value: "a-z",
		},
		{
			title: "Z - A",
			value: "z-a",
		},
		{
			title: "Rating",
			value: "rating",
		},
		{
			title: "Format",
			value: "format",
		},
		{
			title: "Date Added",
			value: "date added",
		},
	],

	siteLanguage: "en",
	addToDefault: false,
	fetchedAnimes: [],
	totalFetchedAnimes: 0,
	numOfFetchedAnimesPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const { i18n } = useTranslation();

	const [state, dispatch] = useReducer(reducer, initialState);

	// axios
	const authFetch = axios.create({
		baseURL: "/api/v1",
	});
	// request

	authFetch.interceptors.request.use(
		(config) => {
			config.headers.common["Authorization"] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	// response

	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === 401) {
				logoutUser();
			}
			return Promise.reject(error);
		}
	);

	// const playOrPauseAudio = () => {
	//   if (state.isAudioPlaying === true) {
	//     audioRef.current.pause();
	//     dispatch({
	//       type: CHANGE_AUDIO_STATE,
	//       payload: false,
	//     });
	//   } else {
	//     audioRef.current.play();
	//     dispatch({
	//       type: CHANGE_AUDIO_STATE,
	//       payload: true,
	//     });
	//   }
	// };

	const changeTheme = (theme) => {
		dispatch({
			type: CHANGE_THEME,
			payload: theme,
		});

		// if there is a user, update the default theme in database
		if (state.user) {
			const user = state.user;
			user.theme = theme;
			updateUser(user);
		}
	};

	const changeDefaultPlaylistPolicy = () => {
		dispatch({
			type: CHANGE_DEFAULT_PLAYLIST_POLICY,
		});
	};

	const changeSiteLanguage = (lang) => {
		dispatch({
			type: CHANGE_SITE_LANGUAGE,
			payload: lang,
		});

		i18n.changeLanguage(lang);
	};

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN });
		try {
			const { data } = await axios.post(
				`/api/v1/auth/${endPoint}`,
				currentUser
			);
			const { user, token } = data;
			console.log(user);
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, token, alertText },
			});
			dispatch({
				type: CHANGE_THEME,
				payload: user.theme,
			});
			addUserToLocalStorage({ user, token });
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const logoutUser = async () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			const oldUser = JSON.parse(localStorage.getItem("user"));

			const { data } = await authFetch.patch("/auth/updateUser", currentUser);

			const { user, token } = data;

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { oldUser, user, token },
			});
			dispatch({
				type: CHANGE_THEME,
				payload: user.theme,
			});
			addUserToLocalStorage({ user, token });
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}
	};

	const deleteUser = async (currentUser) => {
		dispatch({ type: DELETE_USER_BEGIN });
		try {
			const { data } = await authFetch.delete("/auth/deleteUser", currentUser);
			const { user, token } = data;
			dispatch({
				type: DELETE_USER_SUCCESS,
				payload: { user, token },
			});
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: DELETE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}
		// clearAlert();
		removeUserFromLocalStorage();
	};

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	const handlePlaylistChange = ({ value }) => {
		// find the playlist with the name of the value
		const playlist = state.userPlaylists.find(
			(playlist) => playlist.id === value
		);

		if (!playlist) {
			alert("Playlist not found");
		}
		dispatch({ type: HANDLE_PLAYLIST_CHANGE, payload: { playlist } });
	};
	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};

	const createAnime = async (anime, playlistID, playlistTitle) => {
		dispatch({ type: CREATE_ANIME_BEGIN, payload: anime });

		try {
			const creationDate = anime.attributes.startDate;
			const title =
				anime.attributes.titles.en ||
				anime.attributes.titles.en_jp ||
				anime.attributes.canonicalTitle ||
				"Title N/A";
			const id = anime.id || 0;
			const rating = anime.attributes.averageRating || 9001;
			const format = anime.attributes.subtype || "N/A";
			const episodeCount = anime.attributes.episodeCount || 9001;
			const synopsis = anime.attributes.synopsis || "N/A";
			const coverImage = anime.attributes.posterImage.small || "N/A";
			const youtubeVideoId = anime.attributes.youtubeVideoId || "N/A";
			const japanese_title =
				anime.attributes.titles.ja_jp ||
				anime.attributes.titles.en_jp ||
				anime.attributes.canonicalTitle ||
				"Title N/A";
			const isDemoAnime = state.user.isDemo ? true : false;

			await authFetch.post("/animes", {
				title,
				id,
				rating,
				format,
				episodeCount,
				synopsis,
				coverImage,
				creationDate,
				youtubeVideoId,
				japanese_title,
				playlistID,
				isDemoAnime,
			});

			dispatch({
				type: CREATE_ANIME_SUCCESS,
				payload: { title, playlistTitle },
			});
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: CREATE_ANIME_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		// clearAlert();
	};

	const getAnimes = async () => {
		const { page, search, searchStatus, searchType, sort, currentPlaylist } =
			state;

		let url = `/animes?page=${page}&status=${searchStatus}&animeType=${searchType}&sort=${sort}&currentPlaylistID=${currentPlaylist.id}`;
		if (search) {
			url = url + `&search=${search}`;
		}
		dispatch({ type: GET_ANIMES_BEGIN });
		try {
			const { data } = await authFetch(url);
			const { animes, totalAnimes, numOfPages } = data;
			dispatch({
				type: GET_ANIMES_SUCCESS,
				payload: {
					animes,
					totalAnimes,
					numOfPages,
				},
			});
		} catch (error) {
			dispatch({
				type: GET_ANIMES_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
	};

	const deleteAnime = async (animeId) => {
		dispatch({ type: DELETE_ANIME_BEGIN });
		try {
			await authFetch.delete(`/animes/${animeId}`);
			dispatch({
				type: DELETE_ANIME_SUCCESS,
				payload: { animeId },
			});
			getAnimes();
		} catch (error) {
			logoutUser();
		}
		clearAlert();
	};

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};
	const changePage = (page) => {
		dispatch({ type: CHANGE_PAGE, payload: { page } });
	};

	const getPlaylists = async () => {
		dispatch({ type: GET_PLAYLIST_BEGIN });
		try {
			const { data } = await authFetch("/playlists");
			const { playlists } = data;

			dispatch({
				type: GET_PLAYLIST_SUCCESS,
				payload: { playlists },
			});
		} catch (error) {
			dispatch({
				type: GET_PLAYLIST_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		// clearAlert();
	};

	const createPlaylist = async (playlistTitle) => {
		dispatch({ type: CREATE_PLAYLIST_BEGIN });

		let playlist = state.userPlaylists.find(
			(playlist) => playlist.title === playlistTitle
		);

		if (playlist) {
			playlistTitle += `${Math.floor(Math.random() * 100)}`;
		}

		playlist = {
			title: playlistTitle,
			userId: `${state.userPlaylists.length + 1}`,
		};

		try {
			await authFetch.post("/playlists", playlist);

			getPlaylists();
			dispatch({
				type: CREATE_PLAYLIST_SUCCESS,
			});
		} catch (error) {
			if (error.response.status === 401) return;

			dispatch({
				type: CREATE_PLAYLIST_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
	};

	const updatePlaylist = async (playlist) => {
		dispatch({ type: UPDATE_PLAYLIST_BEGIN });

		if (playlist.id === "0") {
			toast.error(`Woops. The default playlist can not be edited`, {
				toastId: "update-playlist-error",
			});
			return;
		}

		// make sure the playlist with the same title does not already exist
		let playlistTitle = playlist.title;
		let playlistToUpdate = state.userPlaylists.find(
			(playlist) => playlist.title === playlistTitle
		);
		if (playlistToUpdate) {
			playlist.title += `${Math.floor(Math.random() * 100)}`;
		}
		playlist.title = playlistTitle;

		try {
			const { data } = await authFetch.put(
				`/playlists/${playlist.id}`,
				playlist
			);
			// const { playlist: updatedPlaylist } = data;

			dispatch({
				type: UPDATE_PLAYLIST_SUCCESS,
			});
		} catch (error) {
			if (error.response.status === 401) return;

			dispatch({
				type: UPDATE_PLAYLIST_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
	};

	const deletePlaylist = async (playlistId) => {
		dispatch({ type: DELETE_PLAYLIST_BEGIN });
		try {
			await authFetch.delete(`/playlists/${playlistId}`);
			getPlaylists();
			dispatch({
				type: DELETE_PLAYLIST_SUCCESS,
			});
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: DELETE_PLAYLIST_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
	};

	const fetchAnimes = async ({
		page,
		baseURL,
		filter,
		searchText,
		pagination,
		sort,
	}) => {
		dispatch({ type: FETCH_ANIMES_BEGIN });
		// the fetching is done here. the sorting is passed in from AddAnime Page
		let APIURL = baseURL;

		if (filter === "true") {
			APIURL += "?filter[text]=" + searchText + "&page[limit]=10";
		}
		if (pagination === "true") {
			APIURL += "&page[offset]=" + (page - 1) * 10;
		}

		if (sort !== "false") {
			APIURL += "&sort=" + sort;
		}

		try {
			fetch(APIURL)
				.then((res) => res.json())
				.then((data) => {
					let animes = data.data;
					let totalFetchedAnimes = 10;
					if (filter === "true") {
						totalFetchedAnimes = data.meta.count;
					}
					let numOfFetchedAnimesPages = Math.ceil(totalFetchedAnimes / 10);

					if (!animes) {
						toast.error("No animes found", {
							toastId: "no-animes-found",
						});
						animes = [];
					}

					dispatch({
						type: FETCH_ANIMES_SUCCESS,
						payload: { animes, totalFetchedAnimes, numOfFetchedAnimesPages },
					});
				})
				.catch((error) => {
					dispatch({
						type: FETCH_ANIMES_ERROR,
						payload: { msg: error.response.data.msg },
					});
				});
		} catch (error) {
			dispatch({
				type: FETCH_ANIMES_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		// clearAlert();
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				logoutUser,
				updateUser,
				deleteUser,
				handleChange,
				handlePlaylistChange,
				clearValues,
				createAnime,
				getAnimes,
				getPlaylists,
				createPlaylist,
				changeSiteLanguage,
				deleteAnime,
				updatePlaylist,
				deletePlaylist,
				changeDefaultPlaylistPolicy,
				clearFilters,
				changePage,
				fetchAnimes,
				changeTheme,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
