import styled from 'styled-components';

export const EmptyOverlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const ImagesContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
`;

export const previewStyles = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'cover',
};

export const docStyles = {
  minHeight: '55px',
  minWidth: '55px',
  height: '100%',
  width: '100%',
};
