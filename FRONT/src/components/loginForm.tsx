import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { navigate } from "astro:transitions/client"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: { preventDefault: () => void }){
        e.preventDefault()
        try {
            const requestBody = {email, password}
            const { data, error } = await authClient.signIn.email({
              email,
              password,
              callbackURL: "/dashboard",
            }, {
              onRequest:(ctx: any) => {
                console.log(requestBody.email + ' ' + requestBody.password);
              },
              onSuccess:(ctx: any) => {
                navigate('/dashboard')
              },
              onError:(ctx: any) => {
                alert(ctx.error.message)
              }
            })
        } catch (error) {
            console.log(error);            
        }
    }


  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleLogin} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={e => {setEmail(e.target.value)}} required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="password_reset"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" onChange={e => {setPassword(e.target.value)}} required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
