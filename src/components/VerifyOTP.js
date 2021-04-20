import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import { verifyOTP } from './npm-module';
import otpManager from 'otp-manager-node';

const VerifyOTP = () => {
	const [email, setEmail] = useState('');
	const [otp, setOpt] = useState('');
	useEffect(() => {
		const M = window.M;
		M.AutoInit();
	});
	const verifyData = async () => {
		if (!email || !otp) {
			const M = window.M;
			M.toast({ html: 'Input Should not be empty' });
		} else {
			if (!email.includes('@') || !email.includes('.')) {
				const M = window.M;
				M.toast({ html: 'Invalid Email' });
			} else if (otp.toString().length !== 6) {
				const M = window.M;
				M.toast({ html: 'OTP should containen 6 digits' });
			} else {
				let data = { email, otp };
				console.log(data);
				const response = await otpManager.verifyOTP(email, otp);
				console.log(response);
				if (response.result) {
					const M = window.M;
					M.toast({ html: 'OTP Matched' });
				} else {
					const M = window.M;
					M.toast({ html: response.message });
				}
			}
		}
	};
	return (
		<div className='verify-otp'>
			<div className='generate-otp container'>
				<div className='row'>
					<div className='col l8 offset-l2 s10 offset-s1'>
						<div className='card generate-card '>
							<div className='card-content'>
								<div className='input-field '>
									<input
										id='email'
										type='email'
										className='validate'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<label htmlFor='email'>Email</label>
								</div>
								<div className='input-field '>
									<input
										id='otp'
										type='number'
										className='validate'
										value={otp}
										onChange={(e) => setOpt(e.target.value)}
									/>
									<label htmlFor='otp'>OTP</label>
								</div>
								<div className='center'>
									<Link className='waves-effect waves-light btn ' onClick={verifyData}>
										Verify OTP
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyOTP;
