"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadDropzone } from "@/utils/uploadthing";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createFile, ICreateFileInput } from "@/app/server/files-actions";
import { useSession } from "@/lib/auth-client";
import { useQuery, useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react";
import UploadFormTags from "./uploadform-tags";
// Define interfaces for better type safety
interface FileState {
    ref: string | null;
    type: string | null;
    name: string | null;
    customId: string | null;
    isUploaded: boolean;
    error: string | null;
  }

  // Improved form schema with better validation
  const formSchema = z.object({
    title: z.string()
      .min(2, "Title must be at least 2 characters")
      .max(50, "Title cannot exceed 50 characters"),
    description: z.string()
      .min(2, "Description must be at least 2 characters")
      .max(50, "Description cannot exceed 50 characters"),
    tags: z.string()
      .min(2, "Tags must be at least 2 characters")
      .max(50, "Tags cannot exceed 50 characters")
      .refine(val => val.includes(','), { message: "Tags must be comma separated" }),
  });

export type FormValues = z.infer<typeof formSchema>;

export default function UploadForm() {
    const [isSavingVectorLoading, setIsSavingVectorLoading] = useState<boolean>(false);

    // Consolidated file state

    const [fileState, setFileState] = useState<FileState>({
      ref: null,
      type: null,
      name: null,
      customId: null,
      isUploaded: false,
      error: null,
    });

    const { mutate: saveFiles, isPending: isSavingFiles } = useMutation({
      mutationKey: ["saveFiles", fileState.ref],
      mutationFn: async () => {

      },
    });

    // New state for success message
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { data: session } = useSession();

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        tags: "",
      },
    });

    const onSubmit = async (values: FormValues) => {
      if (!session?.user?.id) {
        console.error('User is not authenticated.');
        return;
      }

      try {
        setIsSavingVectorLoading(true);
        const response = await fetch(`/api/ellaai/saveVectors`, {
            method: "POST",
            body: JSON.stringify({ fileKey: fileState.ref }),
        });
        const vectorIds = await response.json();
        const vectorId = vectorIds.id[0];
        console.log(vectorId);
        const file: ICreateFileInput = {
          binaryRef: fileState.ref || "",
          vectorRef: vectorId || "",
          projectId: "9989f7d1-c0a4-4b84-aae0-e7877225ba3c",
          userId: session.user.id,
          name: values.title,
          type: fileState.type || "",
          size: 0,
          description: values.description,
          tags: values.tags,
        };
        await createFile(file);
        setIsSavingVectorLoading(false);
        // Set the success message
        setSuccessMessage('File uploaded successfully!');

        // Optionally, reset the form and file state
        form.reset();
        setFileState({
          ref: null,
          type: null,
          name: null,
          customId: null,
          isUploaded: false,
          error: null,
        });
      } catch (error) {
        console.error('Submission error:', error);
        // Optionally, you can set an error state here
      }
    };
    return <div>
         <UploadDropzone
        appearance={{
          uploadIcon: {},
          button: {
            backgroundColor: "#525DF9",
          },
        }}
        className={cn({
          "ut-button:hidden": fileState.isUploaded && !fileState.error,
        })}
        content={{
          button: () => "Upload your file",
          allowedContent: ({ ready, isUploading, uploadProgress }) =>
            fileState.isUploaded
              ? `Uploaded file: ${fileState.name}:${fileState.type}`
              : "Allowed content: PDF, TXT, PNG, JPG",
          label: ({ isUploading, uploadProgress }) => {
            if (uploadProgress === 100) return "Finishing upload";
            if (isUploading) return "Uploading";
            if (fileState.isUploaded)
              return "File has been uploaded, fill in the form and submit to add file.";
            return "File";
          },
        }}
        endpoint={"fileUploader"}
        onClientUploadComplete={(res) => {
          setFileState({
            ref: res[0].key || null,
            type: res[0].type || null,
            name: res[0].name || null,
            customId: res[0].customId || null,
            isUploaded: true,
            error: null,
          });
        }}
        onUploadError={(error: Error) => {
          setFileState(prev => ({
            ...prev,
            isUploaded: false,
            error: error.message,
          }));
        }}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-8">
          <UploadFormTags form={form} />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File title</FormLabel>
                <FormControl>
                  <Input placeholder="project..." {...field} />
                </FormControl>
                {/* <FormDescription>
                  Give your file a title to help your client and EllaAI
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File description</FormLabel>
                <FormControl>
                  <Textarea
                    className=" resize-none h-24"
                    placeholder="project..."
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  Give your file a description to help your client and EllaAI
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            {fileState.isUploaded && !fileState.error && (
              <button
                type="submit"
                className="bg-[#525DF9] duration-200 border text-background font-medium px-6 py-3 rounded-xl text-sm"
              >
                {
                    isSavingVectorLoading ? <Loader2 className="animate-spin" /> : "Upload file to Ella"
                }
              </button>
            )}
          </div>
        </form>
      </Form>

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-500 text-sm">
          {successMessage}
        </div>
      )}

      {/* Existing Error Message */}
      {fileState.error && (
        <div className="text-red-500 text-sm">{fileState.error}</div>
      )}
    </div>
}
