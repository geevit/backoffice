"use client"; //

import React from "react";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";

const store = createStore({
    authName: "__auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
});

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <AuthProvider store={store}>{children}</AuthProvider>;
};

export default Providers;
