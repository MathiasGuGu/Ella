import UploadForm from "./_components/UploadForm";
const Upload = () => {
  return (
    <div className="w-full h-full rounded-lg border border-slate-200  pb-6 pt-6 flex flex-col px-48 gap-6 overflow-scroll bg-background">
        <UploadForm />
    </div>
  );
};

export default Upload;
