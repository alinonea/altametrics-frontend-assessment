import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    console.log(props)
    
    const navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:3000/auth/login", 
        {email: email, password: password})
        .then(r => {
            if (200 === r.status) {
                localStorage.setItem("user", JSON.stringify({user_name: r.data.user_name,
                     token: r.data.access_token}))
                props.setLoggedIn(true)
                navigate("/home")
            } else {
                setError("Wrong email or password")
            }
        })
    }
        
    const onButtonClick = () => {
        setError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setError("Please enter your email")
            return
        }

        if ("" === password) {
            setError("Please enter a password")
            return
        }
        login()

    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} 
                type="password"/>
            <label className="errorLabel">{error}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Login"} />
        </div>
    </div>
}

export default Login