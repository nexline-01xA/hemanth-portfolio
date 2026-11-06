import { SYSTEM_MAP_NODES } from "../data/systemMap.js";
import { FLAGSHIP_PROJECTS, IN_PROGRESS_PROJECTS } from "../data/projects.js";

const ALL_PROJECTS = [...FLAGSHIP_PROJECTS, ...IN_PROGRESS_PROJECTS];
const titleFor = (id) => ALL_PROJECTS.find((p) => p.id === id)?.title || id;

export default function SystemMap() {
  return (
    <div className="system-map">
      {SYSTEM_MAP_NODES.map((node, i) => (
        <div className="system-node" key={node.id}>
          <div className="system-node__rail">
            <div className="system-node__dot" />
            {i < SYSTEM_MAP_NODES.length - 1 && <div className="system-node__line" />}
          </div>
          <div>
            <div className="system-node__label">{node.label}</div>
            <div className="system-node__projects">
              {node.projectIds.map((id) => (
                <span className="system-node__chip" key={id}>
                  {titleFor(id)}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
