import { defineMiddleware } from  'astro:middleware' ; 
import { serverAuthClient } from '@/lib/auth-client';

export const onRequest = defineMiddleware(async (context: any, next: any ) => { 
    // Ignore API calls to avoid infinite loop
    if (context.url.pathname.startsWith('/api')) {
        return next();
    }

    console.log('Middleware triggered for:', context.url.pathname);
    try {
        // Pass the cookies from the request to the auth client
        const cookieHeader = context.request.headers.get('cookie');
        const { data: session } = await serverAuthClient.getSession({
            fetchOptions: {
                headers: {
                    cookie: cookieHeader || '',
                },
            },
        });
        //console.log('Middleware session:', session);
        context.locals.user = session?.user || null;
        context.locals.session = session?.session || null;
    } catch (error) {
        console.log('Session fetch error:', error);
        context.locals.user = null;
        context.locals.session = null;
    }
   
    //console.log('Context locals after middleware:', context.locals);

    return next() 
})

