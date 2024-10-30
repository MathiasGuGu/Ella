import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ProjectForm from "./project-form";

export default function CreateProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger className="size-36 rounded-xl border border-slate-200 flex items-center justify-center">
        <Plus size={32} strokeWidth={1.5} />
      </DialogTrigger>
      <DialogContent className=" max-w-[60vw] h-[90vh] flex flex-col items-center px-12 pt-12">
        <div>Step 1 - 3</div>
        <DialogHeader>
          <DialogTitle className="text-2xl">Creating a new project</DialogTitle>
          <DialogDescription className="max-w-3xl text-base text-text/80 text-balance"></DialogDescription>
        </DialogHeader>
        <ProjectForm />
      </DialogContent>
    </Dialog>
  );
}
