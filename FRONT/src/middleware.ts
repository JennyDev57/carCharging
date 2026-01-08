import { defineMiddleware } from  'astro:middleware' ; 
import { createAuthClient } from  'better-auth/client' ;

export const onRequest = defineMiddleware(async (context: any, next: any ) => { 
    const API_URL = process.env.API_URL || "http://localhost:5000/";
    console.log('Auth baseURL', API_URL);
    const authClient = createAuthClient ({ 
        baseURL : API_URL,
        fetchOptions: { credentials: 'include' }
    }) 

    const { data: session } = await authClient.getSession({
        fetchOptions: {
            headers: context.request.headers, 
        }
    })
    context.locals.user = session?.user || null;
    context.locals.session = session?.session || null;
   
    return next() 
})

