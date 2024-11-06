"use client";

import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./UploadForm";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

export default function UploadFormTags({ form }: { form: UseFormReturn<FormValues> }) {
    const [remainingTags, setRemainingTags] = useState(20);
    const [currentInput, setCurrentInput] = useState("");
    const { tags } = form.watch();
    const tagsList = tags ? tags.split(",").filter(tag => tag.trim()) : [];
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const lastChar = value[value.length - 1];

        if (lastChar === ',') {
            // Add new tag to the form value
            const newTags = [...tagsList, value.slice(0, -1).trim()]
                .filter(tag => tag)
                .join(',');
            form.setValue('tags', newTags);
            setCurrentInput("");
        } else {
            setCurrentInput(value);
        }
    };

    const handleRemoveTag = (index: number) => {
        const newTags = tagsList.filter((_, i) => i !== index);
        form.setValue('tags', newTags.join(','));
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    return (
        <>
            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem className="">
                        <FormLabel className="flex items-center justify-between">
                            <p>Add file tags</p>
                            <p className="text-xs text-gray-500">{20 - tagsList.length} tags remaining</p>
                        </FormLabel>
                        <FormControl>
                            <div
                                className="min-h-[144px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm flex flex-wrap gap-2 items-start"
                                onClick={handleContainerClick}
                            >
                                {tagsList.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-zinc-50 border border-slate-200 rounded-full text-xs px-2 py-1 flex items-center gap-1"
                                    >
                                        <span>
                                        {tag.trim()}
                                        </span>
                                        <button type="button" onClick={() => handleRemoveTag(index)}>
                                            <X size={12} strokeWidth={1.5} />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="flex-1 bg-transparent outline-none min-w-[100px]"
                                    value={currentInput}
                                    onChange={handleInputChange}
                                    placeholder={tagsList.length === 0 ? "Type and press comma to add tags..." : ""}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
