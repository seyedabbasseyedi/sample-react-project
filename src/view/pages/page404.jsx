import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';

const NotFound = () => {
  	return (
		<Result
			status="404"
			title="404"
			subTitle="صفحه‌ای که دنبال آن بودید پیدا نشد!"
			extra={
				<Button type="primary">
					<Link to="/">بازگشت به صفحه اصلی</Link>
				</Button>
			}
	  	/>
	);
}

export default NotFound;