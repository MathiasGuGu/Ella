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
import { signUp } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSignUp(values: z.infer<typeof formSchema>) {
    console.log(values);

    const { data: input, error: inputError } = formSchema.safeParse(values);
    if (inputError) {
      console.error(inputError);
      return;
    }

    const { data, error } = await signUp.email(
      {
        email: input.email,
        password: input.password,
        name: input.username,
        callbackURL: "http://localhost:3000/",
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
      <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-4">
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
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
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="text-sm text-muted-foreground">
            Already have an account? sign in here
          </p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
