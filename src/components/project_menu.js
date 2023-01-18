import { buildElement } from "../utils/dom_helpers";

const createProjectMenu = (projectManager) => {
  const projectCollection = projectManager.projects;
  const entryPoint = document.querySelector("main");

  const buildLinkListContainer = () => {
    const listContainer = { tag: "ul", children: [] }
    projectCollection.forEach((project) => {
      listContainer.children.push(
        {
          tag: "li",
          children: [
            {
              tag: "a",
              text: project.data.name,
              attributes: { "data-project": project.id }
            },
            {
              tag: "button",
              text: "Delete",
              attributes: {
                "data-btn": "delete",
                "data-id": project.id,
                "data-rerender": "projectSelect"
              }
            }
          ]
        }
      )
    })
    return listContainer;
  }

  const buildLinkSection = () => {
    const sectionContainer = {
      tag: "section",
      children: [
        { tag: "h2", text: "Select Project" },
        {
          tag: "button",
          text: "New Project",
          attributes: { "data-btn": "add-project" }
        },
        buildLinkListContainer()
      ]
    }
    return buildElement(sectionContainer);
  }

  const render = () => {
    entryPoint.replaceChildren();

    const section = buildLinkSection();

    const fragment = document.createDocumentFragment();
    fragment.appendChild(section);
    entryPoint.appendChild(fragment);
  }

  return { render }
}

export default function renderProjectMenu(projectManager) {
  createProjectMenu(projectManager).render();
}
