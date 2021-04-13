import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';

const ServerError = () => {
  	return (
		<Result
			status="500"
			title="500"
			subTitle="با عرض پوزش ، مشکلی در سرور پیش آمده است."
			extra={
				<Button type="primary">
					<Link to="/">بازگشت به صفحه اصلی</Link>
				</Button>
			}
	  	/>
	);
}

export default ServerError;