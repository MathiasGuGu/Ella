"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { project } from "@/db/schema";
import { useSession } from "@/lib/auth-client";

const formSchema = z.object({
  projectName: z.string().min(2).max(50),
  projectDescription: z.string().min(2).max(50),
});

export default function ProjectForm() {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting");
    if (!session?.user) {
      console.log("No session");
      return;
    }
    await db.insert(project).values({
      userId: session.user.id!,
      name: values.projectName,
      description: values.projectDescription,
      customerId: session.user.id!,
    });
    console.log("Done submitting");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-text">
                Project name
              </FormLabel>
              <FormControl>
                <Input
                  className="h-12 rounded-xl text-text/80 text-base shadow-none"
                  placeholder="company name..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-64 max-h-64 min-h-64 resize-none flex items-start text-base text-text/80 justify-start rounded-xl shadow-none"
                  placeholder="Website for company..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="
      bg-text hover:bg-slate-800  duration-200 border border-text text-background font-medium px-12 py-4 rounded-xl text-sm"
          >
            Keep going
          </button>
        </div>
      </form>
    </Form>
  );
}
