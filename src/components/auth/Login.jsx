import React, { useState } from 'react'
import Styles from "./Login.module.css";
import Logo from "./../../assets/gt_logo.png";
import { FaRegEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { TiTickOutline } from "react-icons/ti"
import AxiosInstance from '../api/AxiosInstance';
const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            try {
                const response = await AxiosInstance.post('/loginCheck', {
                    username,
                    password,
                });

                if (response.data.status === 1) {
                    localStorage.setItem('token', response.data.token);
                    toast.success("Logged in successfully", {
                        autoClose: 1000,
                        style: {
                            backgroundColor: '#4CAF50',
                            color: 'white',
                        },
                        icon: <span style={{ color: 'white', fontSize: "25px" }}><TiTickOutline /></span>,
                    });
                    if (localStorage.getItem('token')) {
                        navigate("/fireandsmokedetectionlogs");
                    } else {
                        toast.error("Login failed. Please try again.", {
                            autoClose: 1000,
                        });
                    }                } else {
                    toast.error("Login failed. Please try again.", {
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.", {
                    autoClose: 1000,
                });
            }
        } else {
            toast.warn("Enter username and password..", {
                autoClose: 1000,
            });
        }
    };
    return (
        <section id={Styles.LoginMain}>
            <article>
                <div className={Styles.LogoMain}>
                    <img src={Logo} alt="" />
                </div>
                <div className={Styles.LoginPage}>
                    <section>
                        <div className={Styles.LoginIcon}>
                            <h3>
                                <span>
                                    <FaUser />
                                </span>
                                <span>Login</span>
                            </h3>
                        </div>
                        <article>

                            <form onSubmit={handleSubmit} >

                                <div className={Styles.mdform} >
                                    <div>
                                        <FaRegEnvelope />
                                    </div>
                                    <input type="text" name='username' onChange={e => setUsername(e.target.value)} />

                                </div>
                                <div className={Styles.mdform}>
                                    <div>
                                        <FaLock />
                                    </div>
                                    <input type="password" name='password' onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className={Styles.buttonLog}>
                                    <button className={Styles.LoginButton}>LOGIN</button>
                                </div>
                            </form>
                        </article>
                    </section>
                </div>
            </article>
        </section>
    )
}

export default Login