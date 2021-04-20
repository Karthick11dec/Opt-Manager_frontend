module.exports = {
	generateOTP: async (EMAIL) => {
		console.log(EMAIL);
		const BACKEND_ENDPOINT = 'https://my-otp-manager.herokuapp.com';
		let response;
		const data = { email: EMAIL };
		const req = await fetch(`${BACKEND_ENDPOINT}/generate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const res = await req.json();
		return res;
	},
	verifyOTP: async (EMAIL, OTP) => {
		const BACKEND_ENDPOINT = 'https://my-otp-manager.herokuapp.com';
		let response;
		let data = { email: EMAIL, otp: OTP };
		console.log(data);
		const req = await fetch(`${BACKEND_ENDPOINT}/verify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const res = await req.json();
		console.log(res);
		return res;
	},
};
