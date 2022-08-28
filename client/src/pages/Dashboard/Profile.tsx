import { useState } from "react";
import { FormRow, FormRowSelect, Alert } from "../../Components/Atoms";

import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import pokemon from "../../assets/images/pokemon.webp";
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
		isLoading,
		deleteUser,
		logoutUser,
	} = useAppContext();

	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [theme, setTheme] = useState(user?.theme);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!name || !email) {
			displayAlert();
			return;
		}
		updateUser({ name, email, theme });
	};

	const handleDelete = () => {
		if (!window.confirm(t("profile.confirm"))) {
			return;
		}
		deleteUser();
		logoutUser();
	};

	return (
		<Wrapper>
			<form className="form" onSubmit={handleSubmit}>
				<h3>{t("profile.title")}</h3>
				{showAlert && <Alert />}
				<div className="form-center">
					<FormRow
						type="text"
						name="name"
						labelText={t("profile.name")}
						value={name}
						handleChange={(e) => setName(e.target.value)}
					/>
					<FormRow
						type="email"
						name="email"
						labelText={t("profile.email")}
						value={email}
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormRowSelect
						name="theme"
						disabled={isLoading}
						labelText={t("profile.theme")}
						value={theme}
						handleChange={(e: any) => setTheme(e.target.value)}
						list={[
							{
								title: "light",
								value: "light",
							},
							{
								title: "dark",
								value: "dark",
							},
						]}
					/>

					<button
						className="btn btn-block btn-submit"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? t("profile.wait") : t("profile.save")}
					</button>
				</div>
				<img src={pokemon} alt="pokemon" className="pokemon" />
				<div className="bottom-half ">
					<div>
						<span
							style={{
								marginRight: "10px",
							}}
						>
							{t("profile.enjoy")}
						</span>
						<div className="btn-group">
							<div>
								<button className="btn btn-hipster" type="button">
									<a
										href="https://www.buymeacoffee.com/zachinjapan"
										target={"_blank"}
										rel="noopener noreferrer"
									>
										<div>
											<BiCoffeeTogo color="var(--primary-500)" />
											<span>{t("profile.buy_me_a_coffee")}</span>
										</div>
									</a>
								</button>
								<button className="btn btn-hipster" type="button">
									<a
										href="https://commerce.coinbase.com/checkout/ae3c63d4-ddd8-485e-a6d9-8b1dce89ee42"
										target={"_blank"}
										rel="noopener noreferrer"
									>
										<div>
											<FaBitcoin color="var(--primary-500)" />
											<span>{t("profile.crypto")}</span>
											<script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
										</div>
									</a>
								</button>
							</div>
							<div>
								<button
									className="btn btn-danger"
									onClick={() => handleDelete()}
								>
									{" "}
									{t("profile.delete")}{" "}
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.btn-submit {
		margin-top: 50px !important;
	}

	.btn-group {
		display: flex;
		justify-content: space-between;
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
