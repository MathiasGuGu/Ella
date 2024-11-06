import Image from "next/image";
import { type IFile } from "../_mock-data/mock-files";
import { SizeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function FileContainer({ file }: { file: any }) {
  const imageFileType = file.type.split("/");
  return (
    <div className="w-full h-[400px] rounded-xl text-text  overflow-hidden border-slate-200 relative isolate">
      {/* Top Link and function box */}

      {/* Info box */}
      <div className="w-full h-[70%] relative rounded-xl overflow-hidden bg-gradient-to-tr from-[#DEE0FC] border border-text/10 to-zinc-100 shadow-inner flex items-center justify-center">
        {imageFileType.includes("image") ? (
          <Image
            src={file.url}
            alt={file.name}
            fill
            className=" object-cover rounded-lg"
          />
        ) : (
          <Image
            src={"https://cdn-icons-png.flaticon.com/512/80/80942.png"}
            alt="file"
            width={100}
            height={100}
            className="opacity-50"
          />
        )}
      </div>
      <div className="w-full h-12 flex items-center justify-between gap-2 mt-1 px-4">
        <div className="flex flex-col truncate max-w-[60%]">
          <p className="text-text/80 text-xs">name</p>
          <p>{file.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button className="text-text rounded-lg" variant={"ghost"}>
            <Link size={24} strokeWidth={2} />
          </Button>
          <Button className="text-text rounded-lg" variant={"ghost"}>
            <SizeIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col  px-4 truncate max-w-[70%]">
        <p className="text-text/80 text-xs">info</p>
        <p>{file.info}</p>
      </div>
    </div>
  );
}
