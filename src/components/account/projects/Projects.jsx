import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi.js";
import Menu from "../../ui/Menu.jsx";

const url = import.meta.env.VITE_ACCOUNT_URL;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const authenticatedFetch = useApi();

  useEffect(() => {
    const getProjects = async () => {
      const response = await authenticatedFetch(`${url}/projects`);
      const content = await response.json();
      if (response.ok) {
        setProjects(content);
        console.log("Your Project List: ", content);
      } else {
        console.log("ERROR: ", response.status, content);
      }
    }
    getProjects();
  }, []);

  return (
    <div className="flex w-full">
      <Menu />
      <div className="page-content">
        <div id="projectGrid" className="grid gap-4">
          {projects.length > 0 ? projects.map((proj) => (
            <div key={proj.id} className="card w-96 bg-base-100 card-xl shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{proj.label}</h2>
                <ul>
                  <li>Work: {proj.work}</li>
                  <li>Started: {new Date(proj.startDate).toLocaleDateString("en-us", {dateStyle: 'long'})}</li>
                  <li>Deadline: {proj.deadline || "None Set"}</li>
                  <li>Description: {proj.description || ""}</li>
                </ul>
                <div className="justify-end card-actions">
                  <a href={`/study/projects/${proj.id}`} className="btn btn-primary">Study</a>
                </div>
              </div>
            </div>
          )) :
            <div className="text-xl text-red-500">
              You don't have any projects yet.<br />
              Create one:
              <a href="/study/projects/add" className="btn btn-sm btn-warning m-5">New Project</a>
            </div>
          }

        </div>
      </div>
    </div>
  )
}
