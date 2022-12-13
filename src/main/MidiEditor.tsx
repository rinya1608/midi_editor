import React, {useEffect} from "react";
import {App} from "./components/App/App";
import localforage from "localforage";
import {AuthService} from "../api/AuthService";
import {Box, Typography} from "@mui/material";


function MidiEditor() {

    const [user, setUser] = React.useState(null);

    useEffect(() => {
        setCurrentUser()
        console.log(user)
    }, []);

    const setCurrentUser = () => {
        AuthService.getCurrentUser()
            .then(u => {
                console.log(u)
                if (u != null) {
                    localforage.setItem("user", u.data)
                    setUser(u.data)
                }
            }).catch((e) => {
                console.log(e)
        })
    }

    return (
        <Typography style={{width: "100%", height: " 100%", padding: 0, margin: 0}}>
            {user != null ? <App/> : null}
        </Typography>
    )
}

export default MidiEditor;