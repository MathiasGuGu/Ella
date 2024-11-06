import Link from "next/link";
import CreateProjectDialog from "./_components/create-project-dialog";
import { createProject } from "@/app/server/product-actions";

export default function Project() {
  // async function getAllProjects() {
  //   const projects = await db.query.project.findMany();
  //   console.log(projects);
  // }

  // useEffect(() => {
  //   getAllProjects();
  // }, []);

  return (
    <div className="w-screen h-[calc(100vh-5rem)] flex flex-col gap-4 items-start py-12 text-text px-[5%]">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-medium">
          Choose existing or create a new project.
        </h1>
        <p className="text-text/80">
          Find all your projects here. Choose which project to work on or create
          a brand new project.
        </p>
        <div className="h-12 w-full flex items-center">
          <div className="h-[1px] bg-zinc-200 w-full"></div>
        </div>
      </div>

      <section className="w-full h-auto flex gap-4 ">
        <CreateProjectDialog callback={createProject} />
        <Link
          href={"/1/dashboard/overview"}
          className="size-36 border border-slate-200 rounded-xl  flex items-center justify-center"
        >
          <p className="">Kulien Gartneri</p>
        </Link>
      </section>
    </div>
  );
}
