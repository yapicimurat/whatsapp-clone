import Welcome from "../components/User/Welcome";
const settings = {
    routes: [
        {
            path: "/",
            exact: true,
            component: <Welcome operation="welcome"/>,
            needAuth: false
        },
        {
            path: "/welcome",
            exact: true,
            component: <Welcome operation="welcome"/>,
            needAuth: false
        },
        {
            path: "/login",
            exact: true,
            component: <Welcome operation="login"/>,
            needAuth: false
        },
        {
            path: "/register",
            exact: true,
            component: <Welcome operation="register"/>,
            needAuth: false
        },
        {
            path: "/chat",
            exact: true,
            component: <Welcome operation="chat"/>,
            needAuth: true
        }
    ]
};

export default settings;