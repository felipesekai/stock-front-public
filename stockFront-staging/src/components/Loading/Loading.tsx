import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";
import {bgColor} from "../../utils/Colors";

interface props {
    open: boolean,
}

export const Loading =({open } : props )=>{
    return(
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress
                color={"success"}
            />
        </Backdrop>
    )
}
