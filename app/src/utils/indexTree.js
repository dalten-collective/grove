import isEmpty from 'lodash/isEmpty';
import { getHostSpace, getShipName, getChildPath, getNodeName } from './index';

export const types = { FOLDER: 'folder', FILE: 'file' };
export const getParentPath = (path) => path.split('/').slice(0, -1).join('/');
export const getFileName = (path) => path.split('/').slice(-1)[0];

export const indexTree = (obj, hostSpace) => {
  addRootProperties(obj, hostSpace);
  addIndexNodes(obj.nodes, obj.path);
  addIndexChildrenRecursive(obj, obj.path);
  return obj;
};

export const createLookupTable = (obj, lookup = {}) => {
  const { children, nodes, path } = obj;
  lookup[path] = lookup[path] || obj;
  addLookupNodes(nodes, lookup);
  addLookupChildrenRecurive(children, lookup);
  return lookup;
};

export const addRootProperties = (obj, hostSpace) => {
  if (!obj?.name && !obj?.id) {
    const shipName = getShipName(hostSpace);
    const [host, space, isFullHostSpace] = getHostSpace(shipName);
    obj.id = 'root';
    obj.name = space;
    obj.isRoot = true;
    obj.space = space;
    obj.hostSpace = hostSpace;
    obj.path = hostSpace;
  }
};

export const addIndexNodes = (nodes, path) => {
  if (nodes && !isEmpty(nodes)) {
    nodes.path = nodes.path || getChildPath(path, 'nodes');
    Object.entries(nodes).forEach(([key, val]) => {
      if (key === 'path') return;
      nodes.files = nodes.files || [];
      const name = getNodeName(val, key);
      nodes[key].name = name;
      nodes[key].id = key;
      nodes[key].path = getChildPath(nodes.path, key);
      nodes.files.push(val);
    });
  }
};
export const addIndexChildrenRecursive = (obj, path) => {
  if (Array.isArray(obj.children)) {
    obj.type = types.FOLDER;
    obj.parent = getParentPath(path);
  }
  if (obj.children?.length) {
    obj.children = obj.children.map((child, idx) => {
      const [key] = Object.keys(child);
      const _path = getChildPath(path, key);
      return {
        ...child[key],
        id: _path,
        name: key,
        path: _path,
      };
    });
    obj.children.forEach(indexTree);
  }
};

export const addLookupNodes = (nodes, lookup) => {
  if (nodes && !isEmpty(nodes)) {
    lookup[nodes.path] = lookup[nodes.path] || nodes;
    Object.keys(nodes).forEach((key) => {
      if (key === 'path') return;
      const [path, val] = getFilesPath(nodes, key);
      lookup[path] = val;
    });
  }
};

export const addLookupChildrenRecurive = (children, lookup) => {
  if (children?.length) {
    children.forEach((child) => createLookupTable(child, lookup));
  }
};

export const getFilesPath = (nodes, key) => {
  const [path, val] = (key = 'files'
    ? [`${nodes?.path}/files`, nodes?.files]
    : [nodes[key].path, nodes[key]]);
  return [path, val];
};
