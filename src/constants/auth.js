// authUser.js 

import { reactive } from "vue";

const DEMO_USERS = [
    {
        id: 1,
        name: "Alumni Admin",
        email: "admin@alumni.com",
        password: "12345678",
        role: "admin",
    },
    {
        id: 2,
        name: "alumni User",
        email: "user@alumni.com",
        password: "12345678",
        role: "user",
    },
    {
        id: 3,
        name: "Alumni Modarator",
        email: "modarator@alumni.com",
        password: "12345678",
        role: "modarator",
    },
];

export const authUser = reactive({
    user: null,
    isAuthenticated: false,
});

export const login = (email, password) => {
    const user = DEMO_USERS.find(
        (item) =>
            item.email === email &&
            item.password === password
    );

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password.",
        };
    }

    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    authUser.user = userData;
    authUser.isAuthenticated = true;

    localStorage.setItem(
        "auth_user",
        JSON.stringify(userData)
    );

    return {
        success: true,
        user: userData,
    };
};

export const loadAuthUser = () => {
    const storedUser =
        localStorage.getItem("auth_user");

    if (!storedUser) {
        return;
    }

    try {
        const user = JSON.parse(storedUser);

        if(!user || !user.id || !user.name || !user.email || !user.role) {
            localStorage.removeItem("auth_user");
            return;
        }

        authUser.user = user;
        authUser.isAuthenticated = true;
    } catch (error) {
        localStorage.removeItem("auth_user");
        authUser.user =null;
        authUser.isAuthenticated = false;
    }
};

export const logout = () => {
    authUser.user = null;
    authUser.isAuthenticated = false;

    localStorage.removeItem("auth_user");
};