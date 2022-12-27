import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function FileViewer({ file, url, ...props }) {
  // debugger;
  const docs = [
    { uri: url }, // Remote file
    // { uri: require('./example-files/pdf.pdf') }, // Local File
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}
