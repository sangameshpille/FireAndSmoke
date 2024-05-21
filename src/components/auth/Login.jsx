import React, { useState } from 'react'
import Styles from "./Login.module.css";
import Logo from "./../../assets/gt_logo.png";
import { FaRegEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import LoadingButton from '@mui/lab/LoadingButton';
import { TiTickOutline } from "react-icons/ti"
import AxiosInstance from '../api/AxiosInstance';
const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            setLoading(true);
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
                        navigate("/dashboard");
                    } else {
                        toast.error("Login failed. Please try again.", {
                            autoClose: 1000,
                        });
                    }
                } else {
                    toast.error("Login failed. Please try again.", {
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.", {
                    autoClose: 1000,
                });
            } finally {
                setLoading(false);
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
                                    {/* <button className={Styles.LoginButton}>LOGIN</button> */}
                                    <LoadingButton
                                        className={Styles.LoginButton}
                                        type="submit"
                                        loading={loading}
                                        loadingPosition="start"
                                        variant="outlined"
                                    >
                                     {loading ? "Loading.." :"LOGIN"}   
                                    </LoadingButton>
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