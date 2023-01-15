import { buildElement } from "../utils/dom_helpers";
import modal from "./modal";
import Project from "../lib/project";

const createProjectForm = (projectManager) => {
  const entryPoint = document.querySelector(".modal-box");

  const projectFromInputs = () => {
    const projectName = document.getElementById("name").value;
    return new Project(projectName);
  }

  const buildForm = () => {
    return buildElement({
      tag: "form",
      children: [
        { tag: "label", text: "name", attributes: { for: "name" } },
        { tag: "input", attributes: { type: "text", id: "name", name: "name" } },
      ]
    })
  }

  const addProjectHandler = (event) => {
    event.preventDefault();
    const newProject = projectFromInputs();
    projectManager.addProject(newProject);
    modal.toggle();
  }

  const render = () => {
    entryPoint.replaceChildren();

    const form = buildForm();

    const button = buildElement({
      tag: "button",
      text: "Add Project",
      attributes: { type: "button", "data-rerender": "" }
    })
    button.addEventListener("click", addProjectHandler);
    form.appendChild(button);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(form);
    entryPoint.appendChild(fragment);
  }

  return { render };
}

export default function renderProjectForm(projectManager) {
  createProjectForm(projectManager).render();
}
