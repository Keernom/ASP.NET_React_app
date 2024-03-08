import { useState } from "react"
import { SIGNUP_URL, getToken } from "../../../services/commonService";
import { Container, Row, Col, Stack, Form, FloatingLabel, Carousel } from 'react-bootstrap';
import style from './Login.module.css'

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const enterClick = () => {
        getToken(username, password);
    }

    const registerBtnClick = () => {
        window.location.href = SIGNUP_URL;
    }

    return (
        <>
            <h1 className={style.welcomeTitle}> Welcome! </h1>
            <div className={style.loginTile}>
                <Container className="p-5">
                    <Row className="mb-3">
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Email address" >
                                <Form.Control type="email" placeholder="name@example.com" onChange={e => setUsername(e.target.value)} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Stack gap={3} className="mx-auto">
                                <button className="btn btn-primary" onClick={enterClick}> Enter </button>
                                <button className="btn btn-outline-light" onClick={registerBtnClick}> Sign Up </button>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login;