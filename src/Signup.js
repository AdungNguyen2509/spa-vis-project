import React, { useState } from "react";
import Input from "./components/Input";
import Map from "./components/Map";




export default function Signup() {

    const [data, setData] = useState({
        email: "",
        password: "",
        dob:"",
        lat:"",
        lng:""
    })

    const handleInput = (event) => {
        const { value, name } = event.target
        setData((preValue) => {
            return {
                ...preValue,
                [name]: value,             
            }
        })
    }


    return (
        <div>
            <form>
                <Input
                    text="Email"
                    type="text"
                    name="email"
                    value={data.email}
                    placeholder="Email"
                    onChange={handleInput}
                />
                <Input
                    text="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    placeholder="Password"
                    onChange={handleInput}
                />
                <Input
                    text="Date of birth"
                    type="date"
                    name="dob"
                    value={data.dob}
                    placeholder=""
                    onChange={handleInput}
                />
                
                <Map />
            </form>
        </div>
    )
}