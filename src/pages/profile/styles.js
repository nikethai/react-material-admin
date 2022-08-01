import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    profile__main:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    },
    profile__sub: {
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
    }
}));