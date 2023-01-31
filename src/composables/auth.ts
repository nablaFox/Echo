import { GoogleAuthProvider, signInWithPopup, type Auth } from "firebase/auth"
import { getCurrentUser, useFirebaseAuth } from "vuefire"
import { useUser } from "@/stores/user"

export function useAuth() {
    const auth = useFirebaseAuth() as Auth
    const { add: addUser } = useUser()

    const isLogin = async () => await getCurrentUser() ? true : false;

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
            .catch(err => console.log(err))
        if (result) { return result.user }
    }

    const signUp = async (
        languages: string[],
        username?: string,
        bio?: string
    ) => {
        if (!languages.length) throw new Error('At least one language')
        const user = await signInWithGoogle()
        if (user) await addUser(user.uid, {
            username: username || user.displayName || 'listener',
            email: user.email!,
            languages: languages,
            bio: bio || 'Silence is a true friend who never betrays',
            group: 2,
            currentRoom: null,
            isWaiting: false
        })
    }

    const signOut = () => auth.signOut()

    return {
        signUp,
        isLogin,
        signInWithGoogle,
        signOut
    }
}