import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { LoginOutlined } from '@ant-design/icons';
import { Row, Col, Card, Form, Input, Button, message } from "antd";
import Service from "../../api";
import { useAuth } from "../../context/auth";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 18,
	},
};

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 8,
	},
};

const Login = (props) => {
	const authInfo = useAuth();
	const referer = props.location.state?.referer || '/post-list';
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		setLoading(true);

		let loginData = {
			"username": values.username, // seyedi
			"password": values.password // test
		};

		Service.loginRequest(loginData)
			.then((res) => {
				setLoading(false);
				if (res.status === 200) {

					let data = res.data.result;
					authInfo.setAuthToken(data.access_token);
					
				} else {
					message.error('نام کاربری و یا کلمه عبور اشتباه هست.');
				}
			})
			.catch(err => {
				setLoading(false);
				message.error('نام کاربری و یا کلمه عبور اشتباه هست.');
				console.log(err);
			});
	};

	if (authInfo.authToken) {
		return <Redirect to={referer} />;
	}

	return (
		<Row justify="center" align="middle">
            <Col span={7} >
				<Card title="ورود به سیستم" className="loginForm">
					<Form
						{...layout}
						name="basic"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
					>

						<Form.Item
							label="نام کاربری"
							name="username"
							rules={[
							{
								required: true,
								message: "لطفا نام کاربری خود را واد نمایید!",
							},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="کلمه عبور"
							name="password"
							rules={[
								{
									required: true,
									message: "لطفا کلمه عبور خود را وارد نمایید!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item {...tailLayout}>
							<Button 
								block
								icon={<LoginOutlined />}
								loading={loading}
								type="primary" 
								htmlType="submit">
								ورود
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};

export default Login;