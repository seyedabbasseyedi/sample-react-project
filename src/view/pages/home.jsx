import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

const Home = () => {
  	return (
        <Row justify="center" align="middle">
            <Col span={12} style={{ textAlign: "center" }}>
                <h1>testghasht در یک نگاه</h1>
                <p>
                شرکت تست گشت، با نام تجاری testghasht، امروزه به صورت پویا در عرصه گردشگری IT و رزرواسیون هتل های خارجی فعالیت دارد. سامانه testghasht با تأکید بر امر تسریع و تسهیل فرآیند رزرواسیون هتل های زنجیره ای جهانی به صورت B2B اقدام به ارائه خدمات به همکاران و آژانس های مسافرتی کرده است. testghasht توانسته است با به کارگیری دانش IT خدماتی نظیر وب سرویس هتل (API) و پنل ساین رزرو هتل خارجی، که امکان دسترسی به تأمین کنندگان جهانی هتل را فراهم می کند در اختیار آژانس های مسافرتی قرار دهد و فرایند رزرو هتل را سرعت بخشد.
                </p>
                <br/>
                <Button type="primary">
                    <Link to="/login">ورود یا ثبت نام</Link>
                </Button>
            </Col>
        </Row>
	);
}

export default Home;