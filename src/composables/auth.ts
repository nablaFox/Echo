import { GoogleAuthProvider, signInWithPopup, type Auth } from "firebase/auth"
import { getCurrentUser, useFirebaseAuth } from "vuefire"
import { useUser } from "@/stores/user"

export function useAuth() {
    const auth = useFirebaseAuth() as Auth
    const { add: addUser } = useUser()

    const signUpWithGoogle = async (
        languages: string[],
        username?: string,
        bio?: string
    ) => {
        if (!languages.length) {
            throw new Error('At least one language is required')
        }
        const result = await signInWithGoogle()
        if (!result) { 
            throw new Error('Failed to sign in with Google')
        }
        const { user } = result;
        return await addUser(user.uid, {
            username: username || user.displayName || 'listener',
            email: user.email!,
            languages: languages,
            bio: bio || 'Silence is a true friend who never betrays',
            group: 2,
            currentRoom: null,
            isWaiting: false
        })
    }

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider).catch(err => { alert(err.code) })
    }

    const isLogin = async () => {
        const user = await getCurrentUser()
        return user ? true : false
    }

    const signOut = () => auth.signOut()

    return {
        isLogin,
        signInWithGoogle,
        signUpWithGoogle,
        signOut
    }
}