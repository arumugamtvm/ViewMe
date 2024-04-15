import React from "react";
import { useEffect, useState } from "react";
import { postCheckUsernameApi, postLoginUserApi, postRegisterUserApi } from "../api/loginApi";
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import * as Components from "./styledComponents";

const LoginComponent = () => {
    const navigate = useNavigate()
    const initialFormData = {
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const initialLoginFormData = {
        login_username: '',
        login_password: ''
    }

    const [islogin, toggle] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [formValidationMsg, setFormValidationMsg] = useState(initialFormData);
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
    const [loginFormValidationMsg, setLoginFormValidationMsg] = useState(initialLoginFormData)
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        const username = secureLocalStorage.getItem('username');
        if (username != null || username != undefined)
            navigate('/')
    }, [])

    const onRegister = async () => {
        if (validateLoginForm()) {
            const payload = {
                fullname: formData.name,
                username: formData.username,
                password: formData.password,
                email: formData.email
            }
            const response = await postRegisterUserApi(payload)
            if (response.status == 200) {
                alert('User Registered Successfully!')
                toggle(!islogin)
            }
        }
    }

    const onLogin = async () => {
        setIsloading(true)
        if (validateLoginForm()) {
            const payload = {
                username: loginFormData.login_username.toLowerCase(),
                password: loginFormData.login_password.toLowerCase()
            }
            const response = await postLoginUserApi(payload)
            if (response.status == 200) {
                alert('User Logged In Successfully!')
                setIsloading(false)
                secureLocalStorage.setItem('username', loginFormData.login_username.toLowerCase())
                secureLocalStorage.setItem('token', response.data.token)
                navigate('/')
            }
        }
        setIsloading(false)
    }

    const validateLoginForm = () => {
        let isValid = true
        if (islogin) {
            if (loginFormData.login_username == '') {
                setLoginFormValidationMsg(prev => ({ ...prev, login_username: 'Please Enter Username' }))
                isValid = false
            }
            if (loginFormData.login_password == '') {
                setLoginFormValidationMsg(prev => ({ ...prev, login_password: 'Please Enter Password' }))
                isValid = false
            }
        }
        else {
            if (formData.name == '') {
                setFormValidationMsg(prev => ({ ...prev, name: 'Please Enter Full Name' }))
                isValid = false
            }
            if (formData.username == '') {
                setFormValidationMsg(prev => ({ ...prev, username: 'Please Enter Username' }))
                isValid = false
            }
            if (formData.password != formData.confirmPassword) {
                setFormValidationMsg(prev => ({ ...prev, confirmPassword: 'Password & Confirm Password Should be same' }))
                isValid = false
            }
        }
        return isValid
    }

    const onChangeForm = async (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [id]: value }))
        if (id == 'username') {
            const response = await postCheckUsernameApi({ username: value.toLowerCase() })
            if (response.status == 200)
                setFormValidationMsg(prev => ({ ...prev, username: response.data['message'] }))
            else
                setFormValidationMsg(prev => ({ ...prev, username: 'Username Already Exists' }))

        }
        if (value == '')
            setFormValidationMsg(prev => ({ ...prev, [id]: '' }))
    }
    const onChangeLoginForm = async (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setLoginFormData(prev => ({ ...prev, [id]: value }))
    }

    return (
        <Components.Container>
            <Components.RegisterContainer islogin={islogin}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input id='username' type="text" placeholder="Username" value={formData.username} onChange={onChangeForm} />
                    <span className={`validation-message ${formValidationMsg.username == 'Username is Available' ? 'success-message' : 'error-message'}`}>{formValidationMsg.username}</span>
                    <Components.Input id='name' type="text" placeholder="Name" value={formData.name} onChange={onChangeForm} />
                    <span className={`validation-message error-message`}>{formValidationMsg.name}</span>
                    <Components.Input id='email' type="email" placeholder="Email" value={formData.email} onChange={onChangeForm} />
                    <span className={`validation-message error-message`}>{formValidationMsg.email}</span>
                    <Components.Input id='password' type="password" placeholder="Password" value={formData.password} onChange={onChangeForm} />
                    <Components.Input id='confirmPassword' type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={onChangeForm} />
                    <span className={`validation-message error-message`}>{formValidationMsg.confirmPassword}</span>
                    <Components.Button onClick={onRegister}>Register</Components.Button>
                </Components.Form>
            </Components.RegisterContainer>
            <Components.LoginContainer islogin={true}>
                <Components.Form>
                    <Components.Title>Login</Components.Title>
                    <Components.Input id='login_username' type="text" placeholder="Email / Username" value={loginFormData.login_username} onChange={onChangeLoginForm} />
                    <Components.Input id='login_password' type="password" placeholder="Password" value={loginFormData.login_password} onChange={onChangeLoginForm} />
                    <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                    <Components.Button onClick={onLogin} disabled={isloading}>{isloading ? <CircularProgress style={{ color: '#fff', height: '20px', width: '20px', margin: '0', padding: '0' }}></CircularProgress> : 'Login'}</Components.Button>
                </Components.Form>
            </Components.LoginContainer>
            <Components.OverlayContainer islogin={islogin}>
                <Components.Overlay islogin={islogin}>
                    <Components.LeftOverlayPanel islogin={islogin}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton disabled={isloading} onClick={() => toggle(true)}>
                            Login
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel islogin={islogin}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton disabled={isloading} onClick={() => toggle(false)}>
                            Register
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
}

export default LoginComponent