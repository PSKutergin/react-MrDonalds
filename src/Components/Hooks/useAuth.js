import { useState, useEffect } from "react";

export function useAuth(authFirebase) {
    const [authentication, setAuthentication] = useState(null);
    const auth = authFirebase();

    const provider = new authFirebase.GoogleAuthProvider();
    const logIn = () => auth.signInWithPopup(provider);

    const logOut = () => auth.signOut()
        .catch(err => console.error(err));

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                setAuthentication(user);
            } else {
                setAuthentication(null);
            }
        })
    }, [authentication]);

    return { authentication, logIn, logOut };
}