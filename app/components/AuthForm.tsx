"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { Form } from "../components/ui/form"
import FormField from "../components/FormField"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3).max(50),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = AuthFormSchema(type);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password: ""
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success("Account created successfully. Please sign in");
        router.push('/sign-in');
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Failed to sign in");
          return;
        }
        const result = await signIn({ email, idToken });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success("Signed in successfully");
        router.push('/');
      }
    } catch (error: any) {
      console.error("Error during authentication", error);
      toast.error(error.message || "There was an error");
    }
  }
  const isSigningIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.png" alt="Logo" width={32} height={38} />
          <h2>Interview Compass</h2>
        </div>
        <h3>Elevate Your Interview Experience</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSigningIn && (
              <FormField
                control={form.control}
                name="name"
                label="name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn " type="submit">{isSigningIn ? 'Sign in' : 'Create an Account'}</Button>
          </form>
        </Form>
        <p className="text-center">{isSigningIn ? 'No Account yet?' : 'Have an account already ?'}

          <Link href={!isSigningIn ? '/sign-in' : '/sign-up'} className="text-center text-blue-500 hover:underline m-1">{isSigningIn ? 'Sign up' : 'Sign in'}</Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
