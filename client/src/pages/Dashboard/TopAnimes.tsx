import { useTranslation } from "react-i18next";
import { FetchedAnimesContainer } from "../../Components/Organisms";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";

const MyAnimes = () => {
	const { t } = useTranslation();

	const {
		getPlaylists,
		currentPlaylist,
		userPlaylists,
		isLoading,
		handlePlaylistChange,
		addToDefault,
		changeDefaultPlaylistPolicy,
	} = useAppContext();

	useEffect(() => {
		getPlaylists();
	}, []);

	const handleLocalPlaylistChange = (e: any) => {
		if (isLoading) return;

		handlePlaylistChange({ name: e.target.name, value: e.target.value });
	};

	return (
		<>
			<main className="content full-page" datatype="">
				<h1
					style={{
						textAlign: "center",
					}}
				>
					{t("top_animes.title")}
				</h1>

				<div
					style={{
						display: "flex",

						margin: "0 auto",
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* playlist */}
					<form className="form-row">
						<label htmlFor="playlist" className="form-label">
							{t("search_container.playlist")}
						</label>
						<select
							name="playlist"
							value={currentPlaylist.id}
							onChange={handleLocalPlaylistChange}
							className="form-select"
						>
							{userPlaylists.map((playlist: any, index: number) => {
								return (
									<option key={index} value={playlist.id}>
										{playlist.title}
									</option>
								);
							})}
						</select>

						{/*<div
							className="form-checkbox"
							style={{
								color: "white",
							}}
						>
							<input
								type="checkbox"
								name="addToDefault"
								checked={addToDefault}
								onChange={(e) => {
									changeDefaultPlaylistPolicy(e);
								}}
								className="form-checkbox-input"
								id="addToDefault"
							/>
							<label htmlFor="addToDefault">
								<span> {t("add_anime.add_to_default")}</span>
							</label>
						</div>
						*/}
					</form>
				</div>
				<FetchedAnimesContainer
					searchText={""}
					baseURL={"https://kitsu.io/api/edge/trending/anime"}
					filter={"false"}
					pagination={"false"}
					sort={"false"}
				/>
			</main>
		</>
	);
};

export default MyAnimes;
