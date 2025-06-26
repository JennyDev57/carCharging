import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { authClient } from "@/lib/auth-client";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useEffect } from "react";


async function signOut() {
  await authClient.signOut();
  navigate('/login')
}

const Navbar04Page = async () => {
 
    // const { 
    //     data: session, 
    //     isPending, //loading state
    //     error, //error object
    //     refetch //refetch the session
    // } = authClient.useSession() 

const { data: session, error } = await authClient.getSession()

  console.log(session, error)

  return (
    <div className="min-h-screen bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
              onClick={session ? signOut : undefined}
            >
              {!session ? ( <a href="/login">Sign In</a>) : ("Log Out")} 
            </Button>
            
            {/* <Button className="rounded-full">Get Started</Button> */}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar04Page;
