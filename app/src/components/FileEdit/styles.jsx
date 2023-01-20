import { styled } from '@mui/material/styles';

export const FileEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const FileEditTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const FileEditInput = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-size: 16px;
`;
