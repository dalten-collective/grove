export const initalSidebarItemsState = [
  { title: 'Memes', selected: false },
  { title: 'Books', selected: true },
  { title: 'Images', selected: false },
];

export const getContentProps = (item, selectedPath, setSelectedPath) => ({
  ContentProps: {
    path: item.path,
    isRoot: item.isRoot,
    selectedPath,
    setSelectedPath,
  },
});
