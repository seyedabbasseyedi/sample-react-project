import axios from 'axios';
import axiosRetry from 'axios-retry';

class Service {
	constructor() {

		let service = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			timeout: 30000,
			headers: {
				common: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				}
			}
		});

		axiosRetry(service, {
			retries: 2,
			retryDelay: axiosRetry.exponentialDelay
		});

		service.interceptors.request.use(
			config => {
				config.headers.Authorization = localStorage.getItem("TOKEN");
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);

		service.interceptors.response.use(
			response => {
				return response;
			},
			error => {
				if (error.response.status === 401) {
					localStorage.removeItem("TOKEN");
					window.location = "/login";
					return Promise.reject(false);
				}
		
				return Promise.reject(error);
			}
		);

		this.service = service;
	}


	loginRequest = (data) => {
		let url = 'users/login';
		return this.service.post(url, data)
			.then(res => {
				return res;
			})
			.catch(err => {
				console.log(err, "err");
			})
	}

	logoutRequest = () => {
		let url = 'users/logout';
		return this.service.delete(url)
			.then(res => {
				return res;
			})
			.catch(err => {
				console.log(err, "err");
			})
	}

	getPosts = (param) => {
		let url = param ? `posts${param}` : `posts`;
		return this.service.get(url)
			.then(res => {
				return res;
			})
			.catch(err => {
				console.log(err, "err");
			})
	}
	
}

export default new Service;