export const getFiles = (tree) => tree?.nodes?.files || [];

export const isFolder = (tree) => tree?.children?.length || !isEmpty(tree?.nodes);

export const types = { FOLDER: 'FOLDER', FILE: 'FILE' };

export const getType = (tree) => (isFolder(tree) ? types.FOLDER : types.FILE);

export const getContent = (nodes) => {
  return Array.isArray(nodes.children) || !isEmpty(nodes?.nodes?.files)
    ? [...nodes?.children, ...getFiles(nodes)]
    : [];
};

export const getEmptyNode = () => ({
  id: 'EMPTY_FOLDER',
  name: 'Empty Folder',
  type: 'Folder',
  title: 'Empty Folder',
  size: 'Add File',
  dateUploaded: 'Add',
  kind: 'Empty',
});

// This is unsused, but I'm keeping it here for now
export const Row = ({ node }) => {
  return getType(node) === types.FILE ? (
    <FileRow>
      <Title>{node.path}</Title>
      <Metadata>
        <Size>{node.size}</Size>
        <DateUploaded>{node.dateUploaded}</DateUploaded>
        <FileType>{node.kind}</FileType>
      </Metadata>
    </FileRow>
  ) : (
    <Typography
      sx={{
        fontSize: '2px',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: '1rem',
      }}
    >
      {node.path}
    </Typography>
  );
};
