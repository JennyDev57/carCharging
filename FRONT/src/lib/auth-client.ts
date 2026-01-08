import { createAuthClient } from "better-auth/client"
import { organizationClient } from 'better-auth/client/plugins';


export const authClient =  createAuthClient({
    baseURL: "http://localhost:5000",
    plugins: [organizationClient()],
    fetchOptions: { credentials: 'omit' },
})

export const { signIn, signUp, signOut, useSession } = authClient;