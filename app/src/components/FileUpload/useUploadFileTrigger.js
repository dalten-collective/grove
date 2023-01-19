import React, { useState, useEffect } from 'react';
import { findLast, isEmpty } from 'lodash';
import { useStore } from '../../state/store';
import useFileStore from '../../lib/state/useFileStore';
import { useTrove } from '../../urbit';
import { formatImplicitExtension } from '../../utils/files';
import { getActionStructure, getLeadingSlash } from '../PokeForm/util';
// getSelectedSpace,
import { useForm } from '../../state/form';

export default function useUploadFileTrigger({
  addToTroveOnUpload = true,
  selectedPath,
}) {
  const [uploadFileToggled, setUploadFileToggled] = useState(false);
  const { urbit, ship, pokes } = useTrove();
  const selectedHostSpace = useStore((state) => state.selectedHostSpace);
  const selectedRelativePath = useStore((state) => state.selectedRelativePath);
  const { formAction, formData, setFormAction, setFormData, initFormData } =
    useForm();

  const files = useFileStore((state) => state.files);
  const withOverrides = (overrides) => ({
    ...formData,
    ...overrides,
  });

  const toggleUploadFile = () => {
    setUploadFileToggled(!uploadFileToggled);
  };

  const getInitialFormData = (_selectedRelativePath) => ({
    fromPath: _selectedRelativePath,
    toPath: _selectedRelativePath,
    name: _selectedRelativePath.length
      ? _selectedRelativePath.slice().split('/').pop()
      : '',
    description: '',
    permissions: '',
    url: '',
    extension: '',
    from: '',
    by: '',
    // by: window.ship,
    id: '',
  });

  const getPathDefaults = (field) => {
    if (field.name === 'toPath') return selectedPath;
    if (field.name === 'fromPath') return selectedPath;
    return formData[field.name] || '';
  };
  const getValue = (field, action) => {
    const [predicate] = action?.slice().split('-');
    switch (field.name) {
      case 'fromPath':
      case 'toPath':
        return predicate !== 'move' && predicate !== 'rem'
          ? `/${selectedRelativePath}`
          : formData[field.name];
      default:
        return formData[field.name];
    }
  };
  useEffect(() => {
    console.log('useUploadFileTrigger useEffect');
    if (files && !isEmpty(files) && addToTroveOnUpload) {
      console.log('Add to Trove');
      addAllFilesToCurrentTrove(files);
    }
  }, [files]);

  const getFileInfo = (file) => {
    const key = file.key;
    const name = file?.file?.name || key.slice().split('/').pop();
    const extension = file?.file?.type?.length
      ? `.${file.file.type.slice().split('/').pop()}`
      : '';
    return { name, extension };
  };
  const addAllFilesToCurrentTrove = (_files) => {
    const files = Object.values(_files);
    const toPath = getLeadingSlash(selectedRelativePath);
    const fromPath = getLeadingSlash(selectedRelativePath);
    const [predicate, noun] = getActionStructure(formAction);

    if (selectedPath) {
      files.forEach((file) => {
        if (file.status !== 'success') return;
        if (file.url === '') return;
        if (file.status === 'success') {
          const { name, extension } = getFileInfo(file);

          return pokes.node.add(
            urbit,
            selectedHostSpace,
            withOverrides({
              name,
              extension,
              from: Date.now(),
              url: file.url,
              by: ship,
              permissions: null,
              toPath,
              fromPath,
            }),
            ship
          );
        }
      });
    }
  };

  return { uploadFileToggled, setUploadFileToggled, toggleUploadFile };
}
