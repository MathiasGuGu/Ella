"use server";
import { useQuery } from "@tanstack/react-query";
import FileContainer from "./_components/file-container";
import { files, IFile } from "./_mock-data/mock-files";
import { getAllFiles } from "@/app/server/files-actions";

const Files = async() => {
  // navigate to url + /
  const data = await getAllFiles();
  return (
    <div className="w-full bg-background rounded-lg h-[calc(100vh_-_5rem)] border border-slate-200 flex flex-col items-start justify-start relative">
      {/* <div className="w-full h-20 flex items-center gap-2  justify-between">
        <div className="flex items-center gap-2 text-sm"></div>
        <div className="size-14 border bg-[#525DF9]  shadow-xl text-white rounded-xl flex items-center justify-center">
          <Plus size={24} strokeWidth={1.5} />
        </div>
      </div> */}
      <div className="w-full h-[calc(100vh_-_90px)] pt-6 px-8 pb-16 rounded-xl grid grid-cols-2 gap-8 overflow-y-scroll relative isolate">
        {data?.map((file) => {
          return <FileContainer key={file.id} file={file} />;
        })}
      </div>
      <div className="absolute bottom-0 right-0 w-full h-20 blur bg-gradient-to-t from-background via-[100%] to-transparent "></div>
    </div>
  );
};

export default Files;
