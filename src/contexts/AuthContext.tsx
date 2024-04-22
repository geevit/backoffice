import { UserEntity } from "@geevit/types";
import { useRouter } from "next/navigation";
import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useCookies } from "react-cookie";
import { useActiveShops } from "./ActiveShopContext";
import useSignIn from "react-auth-kit/hooks/useSignIn";
const AuthContext = createContext<{
    user: UserEntity;
    setUser: Dispatch<SetStateAction<UserEntity>>;
    jwt: string | undefined;
    setJwt: Dispatch<SetStateAction<string | undefined>>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    checkIfLoggedIn: () => void;
}>(null!);

export function AuthProvider2({ children }: PropsWithChildren<{}>) {
    const signIn = useSignIn();

    const [cookies, setCookies] = useCookies(["jwt", "user", "shops"]);
    const [user, setUser] = useState<UserEntity>({} as UserEntity);
    const [jwt, setJwt] = useState<string>();
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
        return await fetch(url, config).then(async (res) => {
            const login = await res.json();
            if (!login.jwt) {
                alert(login);
            } else {
                signIn({
                    auth: {
                        token: login.jwt,
                        type: "Bearer",
                    },
                    refresh: login.jwt,
                    userState: login.me,
                });
                setCookies("jwt", login.jwt, {
                    path: "/",
                    sameSite: true,
                    expires: new Date(
                        new Date().getTime() + 60 * 60 * 24 * 1000
                    ),
                });
                setJwt(login.jwt);

                router.push("/");
            }
        });
    };

    const refreshUser = async () => {
        if (cookies.jwt) {
            const config = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.jwt}`,
                },
            } as RequestInit;
            const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
            fetch(url, config)
                .then(async (res) => {
                    const me: { me: UserEntity; jwt: string } =
                        await res.json();
                    if (me.me) {
                        setUser(me.me);
                        setCookies("user", JSON.stringify(me.me), {
                            path: "/",
                            sameSite: true,
                            expires: new Date(
                                new Date().getTime() + 60 * 60 * 24 * 1000
                            ),
                        });
                        setCookies(
                            "shops",
                            JSON.stringify(me.me.shops.map((s) => s.shopId)),
                            {
                                path: "/",
                                sameSite: true,
                                expires: new Date(
                                    new Date().getTime() + 60 * 60 * 24 * 1000
                                ),
                            }
                        );
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const checkIfLoggedIn = () => {
        if (cookies.jwt) {
            refreshUser();
        } else {
            router.push("/login");
        }
    };

    useEffect(() => {
        refreshUser();
    }, [jwt]);

    useEffect(() => {
        if (!jwt && cookies.jwt) {
            setJwt(cookies.jwt);
        }
        if (jwt) {
            refreshUser();
        }
    }, []);

    const logout = () => {
        setCookies("jwt", "", {
            path: "/",
            sameSite: true,
            expires: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        });
        setCookies("user", "", {
            path: "/",
            sameSite: true,
            expires: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        });
        setCookies("shops", "", {
            path: "/",
            sameSite: true,
            expires: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        });
        setJwt("");
        setUser({} as UserEntity);
        router.push("/login");
    };

    const values = {
        user,
        setUser,
        jwt,
        setJwt,
        login,
        logout,
        refreshUser,
        checkIfLoggedIn,
    };
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
