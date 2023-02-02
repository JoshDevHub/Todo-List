import { buildElement } from "../../utils/dom_helpers";

import editIcon from "../../icons/pencil-outline.svg";
import deleteIcon from "../../icons/delete-outline.svg";

const createProjectMenu = (projectManager) => {
  const projectCollection = projectManager.projects;
  const entryPoint = document.querySelector("main");

  const buildLinkListContainer = () => {
    const listContainer = { tag: "ul", children: [] }
    projectCollection.forEach((project) => {
      listContainer.children.push(
        {
          tag: "li",
          attributes: { class: "project", "data-project": project.id },
          children: [
            {
              tag: "h3",
              text: project.data.name,
            },
            {
              tag: "p",
              text: displayTaskCountFor(project.data),
            },
            {
              attributes: { class: "project__actions" },
              children: [
                {
                  tag: "button",
                  attributes: {
                    class: "btn",
                    "data-btn": "edit-project",
                    value: project.id,
                    "data-toggle": "modal",
                  },
                  children: { tag: "svg", data: editIcon },
                },
                {
                  tag: "button",
                  attributes: {
                    class: "btn",
                    "data-btn": "delete",
                    value: project.id,
                    "data-rerender": "projectSelect"
                  },
                  children: { tag: "svg", data: deleteIcon },
                }
              ]
            },
          ]
        }
      )
    })
    return listContainer;
  }

  const displayTaskCountFor = (project) => {
    const taskCount = project.size;
    const taskNoun = taskCount === 1 ? "task" : "tasks";
    return `${taskCount} ${taskNoun}`;
  }

  const deleteHandler = (event) => {
    const deleteButton = event.target.closest("[data-btn='delete']");
    if (!deleteButton) return;

    const id = deleteButton.value;
    projectManager.deleteProjectWith(id);
  }

  const buildLinkSection = () => {
    const sectionContainer = {
      tag: "section",
      children: [
        { tag: "h2", text: "Select Project" },
        {
          tag: "button",
          text: "New Project +",
          attributes: { "data-btn": "add-project", class: "btn btn--primary" }
        },
        buildLinkListContainer()
      ]
    }
    return buildElement(sectionContainer);
  }

  const render = () => {
    entryPoint.replaceChildren();

    const section = buildLinkSection();
    section.addEventListener("click", deleteHandler);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(section);
    entryPoint.appendChild(fragment);
  }

  return { render }
}

export default function renderProjectList(projectManager) {
  createProjectMenu(projectManager).render();
}
