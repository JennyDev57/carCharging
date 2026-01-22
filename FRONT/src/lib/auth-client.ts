import { createAuthClient } from "better-auth/client"
import { organizationClient } from 'better-auth/client/plugins';

// Client-side auth (navigateur)
const API_URL = import.meta.env.PUBLIC_API_URL;
console.log('Auth Client baseURL:', API_URL);

//const SERVER_API_URL = "http://localhost:4321/api"; // Server-side base URL -> Proxy redirect to API (api:5000)
const SERVER_API_URL = "http://api:5000"; // Server-side base URL
console.log('Auth Server baseURL:', SERVER_API_URL);

export const authClient =  createAuthClient({
    baseURL: API_URL,
    plugins: [organizationClient()],
    fetchOptions: { credentials: 'include' },
})

// Server-side auth (middleware, APIs routes)
export const serverAuthClient = createAuthClient({
    baseURL: SERVER_API_URL,
    plugins: [organizationClient()],
    fetchOptions: { credentials: 'include' },
})

export const { signIn, signUp, signOut, useSession, getSession } = authClient;


        // // Direct fetch call instead of using client auth
        // const response = await fetch('http://api:5000/api/auth/get-session', {
        //     method: 'GET',
        //     headers: {
        //         'cookie': cookieHeader || '',
        //     },
        //     credentials: 'include',
        // });
        
        // const data = await response.json();
        // console.log('Middleware session response:', data);
        
        // context.locals.user = data?.user || null;
        // context.locals.session = data?.session || null;