import { buildElement } from "../utils/dom_helpers";
import modal from "./modal";

const createProjectMenu = (projectManager) => {
  const projectCollection = projectManager.projects;
  const entryPoint = document.querySelector(".modal-box");

  const buildLinkListContainer = () => {
    const listContainer = { tag: "ul", children: [] }
    projectCollection.forEach((project) => {
      listContainer.children.push(
        {
          tag: "li",
          children: {
            tag: "a",
            text: project.data.name,
            attributes: { "data-project": project.id } }
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
