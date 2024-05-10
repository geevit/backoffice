

import React from "react";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";

const store = createStore({
    authName: "__auth",
    authType: "cookie",
    cookieDomain: process.env.NEXT_PUBLIC_DOMAIN_URL,
    cookieSecure: false,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <AuthProvider store={store}>{children}</AuthProvider>;
};

export default Providers;
