export const fieldsByAction = {
  'add-folder': {
    heading: 'Add Folder',
    fields: [
      { label: 'toPath', name: 'toPath', type: 'text' },
      { label: 'Name', name: 'name', type: 'text' },
      {
        label: 'Permissions',
        name: 'permissions',
        type: 'text',
        disabled: true,
      },
    ],
  },
  'rem-folder': {
    heading: 'Remove Folder',
    fields: [{ label: 'fromPath', name: 'fromPath', type: 'text' }],
  },
  'move-folder': {
    heading: 'Move Folder',
    fields: [
      { label: 'fromPath', name: 'fromPath', type: 'text' },
      { label: 'toPath', name: 'toPath', type: 'text' },
    ],
  },
  'add-node': {
    heading: 'Add File',
    fields: [
      { label: 'toPath', name: 'toPath', type: 'text' },
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'Url', name: 'url', type: 'text' },
      { label: 'Description', name: 'description', type: 'text' },
      { label: 'Extension', name: 'extension', type: 'text', disabled: true },
      { label: 'From', name: 'from', type: 'text', disabled: true },
      { label: 'By', name: 'by', type: 'text', disabled: true },
    ],
  },
  'rem-node': {
    heading: 'Remove File',
    fields: [
      { label: 'id', name: 'id', type: 'text' },
      { label: 'fromPath', name: 'fromPath', type: 'text' },
    ],
  },
  'edit-node': {
    heading: 'Edit File',
    fields: [
      { label: 'id', name: 'id', type: 'text' },
      { label: 'fromPath', name: 'fromPath', type: 'text' },
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'Description', name: 'description', type: 'text' },
    ],
  },
  'move-node': {
    heading: 'Move File',
    fields: [
      { label: 'id', name: 'id', type: 'text' },
      { label: 'fromPath', name: 'fromPath', type: 'text' },
      { label: 'toPath', name: 'toPath', type: 'text' },
    ],
  },
  // ... more actions
};
