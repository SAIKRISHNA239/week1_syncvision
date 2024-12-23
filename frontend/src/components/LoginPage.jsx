import React, { useState } from "react";
import { login, signup, logout } from "../services/firebase";
import syncImage from "../assets/image/Sync.jpg";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // For Signup
    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Error messages
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (isSignup && password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            if (isSignup) {
                const user = await signup(email, password);
                console.log("User signed up:", user);
                setErrorMessage(""); // Clear errors on success
            } else {
                const user = await login(email, password);
                console.log("User logged in:", user);
                setErrorMessage(""); // Clear errors on success
            }
        } catch (error) {
            setErrorMessage(error.message); // Display error to the user
        }

        setIsLoading(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            console.log("User logged out.");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">
                    {/* Left Form Section */}
                    <div className="col-sm-6 text-black">
                        <div className="px-5 ms-xl-4">
                            <i
                                className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                                style={{ color: "#709085" }}
                            ></i>
                            <span className="h1 fw-bold mb-0">SyncVision</span>
                        </div>

                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <form onSubmit={handleSubmit} style={{ width: "23rem" }}>
                                <h3
                                    className="fw-normal mb-3 pb-3"
                                    style={{ letterSpacing: "1px" }}
                                >
                                    {isSignup ? "Sign Up" : "Log in"}
                                </h3>

                                {/* Display Error Messages */}
                                {errorMessage && (
                                    <div className="alert alert-danger">{errorMessage}</div>
                                )}

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form2Example18"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form2Example18">
                                        Email address
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form2Example28"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form2Example28">
                                        Password
                                    </label>
                                </div>

                                {/* Confirm Password Field for Signup */}
                                {isSignup && (
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="form2Example38"
                                            className="form-control form-control-lg"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <label className="form-label" htmlFor="form2Example38">
                                            Confirm Password
                                        </label>
                                    </div>
                                )}

                                <div className="pt-1 mb-4">
                                    <button
                                        className="btn btn-info btn-lg btn-block"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Processing..."
                                            : isSignup
                                            ? "Sign Up"
                                            : "Login"}
                                    </button>
                                </div>

                                <p className="small mb-5 pb-lg-2">
                                    <a className="text-muted" href="#!">
                                        Forgot password?
                                    </a>
                                </p>
                                <p>
                                    {isSignup
                                        ? "Already have an account? "
                                        : "Don't have an account? "}
                                    <a
                                        href="#!"
                                        className="link-info"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsSignup(!isSignup);
                                            setErrorMessage(""); // Clear errors when toggling
                                        }}
                                    >
                                        {isSignup ? "Log in here" : "Register here"}
                                    </a>
                                </p>
                                <p>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-danger btn-sm"
                                        type="button"
                                    >
                                        Logout
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img
                            src={syncImage}
                            alt="Login"
                            className="w-100 vh-100"
                            style={{ objectFit: "cover", objectPosition: "left" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
