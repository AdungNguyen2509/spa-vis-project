import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Map from "./components/Map";
import Button from "./components/Button";

export default function Signup() {
    const [data, setData] = useState({
        email: "",
        password: "",
        dob: "",
        lat: "",
        lng: ""
    })

    const [formErr, setFormErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    //handle input 
    const handleInput = (event) => {
        const { value, name } = event.target
        setData((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }
    console.log(data)

    //insert data into server
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErr(validate(data))
        setIsSubmit(true)
        console.log(formErr)
    }

    useEffect(() => {
        if (Object.keys(formErr).length === 0 && isSubmit) {
            fetch('http://localhost:5000/signup', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    date: data.dob,
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => {
                    console.log("Error:" + err)
                })
        }
    }, [formErr])

    const validate = (values) => {
        const errors = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Email has the wrong format";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } 

        if (!values.dob) {
            errors.dob = "Date of birth is required";
        }
        return errors
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>User Signup</h1>
                <Input
                    text="Email "
                    type="text"
                    name="email"
                    value={data.email}
                    placeholder="Email"
                    onChange={handleInput}
                />
                <p>{formErr.email}</p>

                <Input
                    text="Password "
                    type="password"
                    name="password"
                    value={data.password}
                    placeholder="Password"
                    onChange={handleInput}
                />
                <p>{formErr.password}</p>
                <Input
                    text="Date of birth "
                    type="date"
                    name="dob"
                    value={data.dob}
                    onChange={handleInput}
                    min= "1950-01-01"
                    max= "2022-10-02"
                />
                <p>{formErr.dob}</p>

                <Map />

                <Button
                    type="submit"
                    text="Sign up"
                    style={{
                        color: "black",
                        margin: "40px",
                        padding: "10pX 20px",
                        display: "inline-block"
                    }}
                />

            </form>
        </div>
    )
}