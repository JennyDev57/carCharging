import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { navigate } from "astro/virtual-modules/transitions-router.js"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e: { preventDefault: () => void }){
        e.preventDefault()
        try {
            const requestBody = {email, password}
            const { data, error } = await authClient.signUp.email({
              email: email,
              password: password,
              name: email,
              callbackURL: "/login"             
            }, {
              onRequest:(ctx) => {

              },
              onSuccess:(ctx) => {
                navigate('/login')
              },
              onError:(ctx) => {
                alert(ctx.error.message)
              }
            })
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleRegister} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={e => {setEmail(e.target.value)}} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label> 
          <Input id="password" type="password" onChange={e => {setPassword(e.target.value)}} required />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Sign In
        </a>
      </div>
    </form>
  )
}
