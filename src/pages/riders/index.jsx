import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import ProjectGrid from "./ProjectGrid";
import ProjectList from "./ProjectList";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { toggleAddModal } from "./store";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import { useRiders } from "@/data/riders";

const ProjectPostPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();

  const { isLoading, data } = useRiders();

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Riders
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}>
          <Button
            icon="heroicons:list-bullet"
            text="List view"
            disabled={isLoading}
            className={`${
              filler === "list"
                ? "bg-slate-900 dark:bg-slate-700  text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("list")}
          />
          <Button
            icon="heroicons-outline:view-grid"
            text="Grid view"
            disabled={isLoading}
            className={`${
              filler === "grid"
                ? "bg-slate-900 dark:bg-slate-700 text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("grid")}
          />
          <Button
            icon="heroicons-outline:filter"
            text="Filters"
            className="bg-white dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-900 hover:text-white btn-md  h-min text-sm font-normal"
            iconClass=" text-lg"
          />
          <AddProject />
        </div>
      </div>
      {isLoading && filler === "grid" && <GridLoading count={4} />}
      {isLoading && filler === "list" && <TableLoading count={4} />}

      {filler === "grid" && !!data && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {data.map((project, projectIndex) => (
            <ProjectGrid rider={project} key={projectIndex} />
          ))}
        </div>
      )}
      {filler === "list" && !!data && (
        <div>
          <ProjectList riders={data} />
        </div>
      )}
      <EditProject />
    </div>
  );
};

export default ProjectPostPage;
