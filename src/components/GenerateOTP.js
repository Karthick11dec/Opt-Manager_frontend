import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import { generateOTP } from './npm-module';
import { FRONTEND_ENDPOINT } from './endpoint';
import otpManager from 'otp-manager-node';

const GenerateOTP = () => {
	const [email, setEmail] = useState('');
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {
		const M = window.M;
		M.AutoInit();
	});
	const handleGenerateOTP = async () => {
		if (!email) {
			const M = window.M;
			M.toast({ html: 'Input Should not be empty' });
		} else {
			if (email.includes('@') && email.includes('.')) {
				setLoading(true);
				let data = { email };
				console.log(data);
				const response = await otpManager.generateOTP(email);
				console.log(response);
				if (response.message === 'created') {
					const M = window.M;
					M.toast({ html: 'Email Sent to your Client' });
				} else {
					const M = window.M;
					M.toast({ html: response.message });
				}
				setLoading(false);
				window.location.href = `${FRONTEND_ENDPOINT}/verify`;
			} else {
				const M = window.M;
				M.toast({ html: 'Invalid Email' });
			}
		}
	};
	return (
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
							<div className='center'>
								<Link
									to='#'
									className='waves-effect waves-light btn '
									onClick={handleGenerateOTP}
									disabled={isLoading ? true : false}
								>
									Generate OTP
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GenerateOTP;
