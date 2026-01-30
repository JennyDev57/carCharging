import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { EyeOffIcon, EyeIcon } from "lucide-react"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { navigate } from "astro:transitions/client"


function validatePassword(password: string): boolean {
  const hasMinLength = password.length >= 8
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

  if (!hasMinLength) {
    return false
  }
  if (!hasLowercase) {
    return false
  }
  if (!hasUppercase) {
    return false
  }
  return true
}

function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [nameError, setNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [passwordConfirmValid, setpasswordConfirmValid] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)


  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value
    setPassword(newPassword)
    if (newPassword && !validatePassword(newPassword)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et éventuellement des caractères spéciaux.")
      setPasswordValid(false)
    } else {
      setPasswordError(null)
      setPasswordValid(true)
      
      if (confirmPassword  && !validatePasswordMatch(newPassword, confirmPassword)) {
        setConfirmPasswordError("Les mots de passe ne correspondent pas.")
        setpasswordConfirmValid(false)
      } else {
        setConfirmPasswordError(null)
      }
    }
  }

const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = event.target.value
    setConfirmPassword(newConfirmPassword)
    if (password && !validatePasswordMatch(password, newConfirmPassword)) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.")
    } else {
      setConfirmPasswordError(null)
      setpasswordConfirmValid(true)
    }
  }

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation du nom
    console.log("Submitting form with values:", { name, email, password, confirmPassword });
    if (!name) {
      setNameError("Le nom est requis.");
    } else {
      setNameError(null);
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Une adresse email valide est requise.");
    } else {
      setEmailError(null);
    }

    // Validation du mot de passe
    
    if (!validatePassword(password)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et éventuellement des caractères spéciaux.");
      setPasswordValid(false);
    } else {
      setPasswordError(null);
    }

    // Validation de la confirmation du mot de passe
    if (!validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
      setpasswordConfirmValid(false);
    } else {
      setConfirmPasswordError(null);
    }
    // Si toutes les validations passent, soumettre le formulaire
    console.log(nameError, emailError, passwordError, confirmPasswordError);
    if (nameError == null && emailError == null && passwordError == null && confirmPasswordError == null) {

      const requestBody = {email, name, password}
      const { data, error } = await authClient.signUp.email({
        email,
        name,
        password,
        callbackURL: "/dashboard",
      }, {
        onRequest:(ctx: any) => {
          console.log(requestBody.email, requestBody.name, requestBody.password);
        },
        onSuccess:(ctx: any) => {
          navigate('/dashboard')
        },
        onError:(ctx: any) => {
          alert(ctx.error.message)
        }
      })
    }
  }
  

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props} >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {nameError && (
            <FieldDescription className="text-xs text-red-500">{nameError}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email || ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && (
            <FieldDescription className="text-xs text-red-500">{emailError}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className='relative'>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              onChange={handlePasswordChange}
              className={passwordValid ? "border-green-500 border-2 focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500" : ""}
            />
            <Button
              variant='ghost'
              size='icon'
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPassword(!showPassword);
                document.getElementById('password')?.focus();
              }}
              className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
          {(passwordError) && (
            <FieldDescription className="text-xs text-red-500">{passwordError}</FieldDescription>
          )}
          {(!passwordError) && (
            <FieldDescription className="text-muted-foreground text-xs">
              Au moins 8 caractères, 1 minuscule, 1 majuscule, caractères spéciaux optionnels
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            onChange={handleConfirmPasswordChange}
            className={passwordConfirmValid && passwordValid ? "border-green-500 border-2 focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500" : ""}
          />
          {confirmPasswordError && (
            <FieldDescription className="text-xs text-red-500">{confirmPasswordError}</FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
            Continue with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

