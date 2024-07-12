import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export function checkAuth(router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log("User is not authenticated, redirecting to login...");
            router.push("/login");
        } else {
            console.log("User is authenticated.");
            console.log(user.uid);
            console.log(user.displayName);
        }
    });
}

