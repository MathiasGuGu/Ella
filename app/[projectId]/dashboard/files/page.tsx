import { Button } from "@/components/ui/button";
import FileContainer from "./_components/file-container";
import { files, IFile } from "./_mock-data/mock-files";

const Files = () => {
  // navigate to url + /
  return (
    <div className="w-full h-[calc(100vh_-_5rem)] flex flex-col items-start justify-start relative">
      <div className="w-full h-12 flex items-center gap-2 ">
        <Button variant="ghost">File type</Button>
        <Button variant="ghost">Client</Button>
        <Button variant="ghost">Date</Button>
      </div>
      <div className="w-full h-[calc(100vh_-_90px)] pt-6 pb-16 rounded-xl grid grid-cols-2 gap-4 overflow-y-scroll relative isolate">
        {files.map((file: IFile) => {
          return <FileContainer key={file.id} file={file} />;
        })}
      </div>
      <div className="absolute bottom-0 right-0 w-full h-20 blur bg-gradient-to-t from-background via-[100%] to-transparent "></div>
    </div>
  );
};

export default Files;
