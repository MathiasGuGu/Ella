"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSignIn(values: z.infer<typeof formSchema>) {
    console.log(values);

    const { data: input, error: inputError } = formSchema.safeParse(values);
    if (inputError) {
      console.error(inputError);
      return;
    }

    const { data, error } = await signIn.email(
      {
        email: input.email,
        password: input.password,
        callbackURL: "http://localhost:3000/",
        dontRememberMe: false,
      },
      {
        onError: () => {
          console.log("error");
        },
        onSuccess: () => {
          console.log("success");
        },
        onRequest: () => {
          console.log("request");
        },
      }
    );

    if (error) {
      console.error(error);
      return;
    }

    return data;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="text-sm text-muted-foreground">
            Forgot your password?{" "}
            <Link href="/forgot-password">Change password here</Link>
          </p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
