import "./welcome.css";
import background from "../assets/background.jpg"
import { useEffect } from "react";
import { successToast } from "../utils/toasts";

const Welcome = () => {

    useEffect(() => {
        successToast("Welcome !")
    }, [])

    return (
        <div className="welcome-container" style={{ backgroundImage: `url(${background})` }}>
            <div>
                <p className="welcome-heading">Welcome to <span>Ecommers</span></p>
                <p className="welcome-subtitle">This project is build for Coding Ninjas Frontend test</p>
            </div>

        </div>
    );
}

export default Welcome;