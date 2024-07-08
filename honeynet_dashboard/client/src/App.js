import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import HomePage from "./pages/HomePage";
import PiDetailsPage from "./pages/PiDetailsPage";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
	let [authenticated, setAuthenticated] = useState(false);
	let [loading, setLoading] = useState(true)

	async function getAuthStatus() {
		return axios.get(apiUrl + `/auth/user/verify-cookie`, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		})
	}

	async function isAuthenticated() {
		const authStatus = await getAuthStatus();
		setAuthenticated(authStatus.data.isAuthenticated);
		setLoading(false);
	}

	useEffect(() => {
		isAuthenticated();
	}, [])

	return (
		<>
			{!authenticated && <LoginPage />}

			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<LoginPage />} />
					<Route exact path="/login" element={<LoginPage />} />
				</Routes>

				{authenticated && (
					<div>
						<Routes>
							<Route exact path="/details/:id" element={<HomePage />} />
							<Route exact path="/pi-details/:id" element={<PiDetailsPage />} />
						</Routes>
					</div>
				)}
			</BrowserRouter>
		</>
	);
}

export default App;
