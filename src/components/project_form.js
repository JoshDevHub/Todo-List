import { buildElement } from "../utils/dom_helpers";
import modal from "./modal";

const createProjectForm = (project) => {
  const entryPoint = document.querySelector(".modal-box");

  const createFormElement = () => {
    return buildElement({
      tag: "form",
      children: [
        { tag: "label", text: "name", attributes: { for: "name" } },
        {
          tag: "input",
          attributes: {
            type: "text",
            id: "name",
            name: "name",
            value: project.name ?? "",
          }
        },
      ]
    })
  }

  const render = () => {
    entryPoint.replaceChildren();

    const form = createFormElement();
    const fragment = document.createDocumentFragment();
    fragment.appendChild(form);
    entryPoint.appendChild(fragment);
  }

  return { render };
}

const renderNewProjectForm = (projectManager, project) => {
  createProjectForm(project).render();

  const form = document.querySelector("form");

  const addProjectHandler = () => {
    const projectName = document.getElementById("name").value;
    project.name = projectName;
    projectManager.addProject(project);
    modal.toggle();
  }

  const button = buildElement({
    tag: "button",
    text: "Add Project",
    attributes: { type: "button", "data-rerender": "currentProject" }
  })
  button.addEventListener("click", addProjectHandler);

  form.appendChild(button);
}

const renderEditProjectForm = (project) => {
  createProjectForm(project).render();

  const form = document.querySelector("form");

  const editProjectHandler = () => {
    const newName = document.getElementById("name").value;
    project.name = newName;
    modal.toggle();
  }

  const button = buildElement({
    tag: "button",
    text: "Edit Project",
    attributes: { type: "button", "data-rerender": "projectSelect" }
  })
  button.addEventListener("click", editProjectHandler);

  form.appendChild(button);
}

export { renderNewProjectForm, renderEditProjectForm };
