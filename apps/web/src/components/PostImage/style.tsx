import { styled } from 'styled-components';

export const PostImageStyle = styled.div`
  overflow: hidden;

  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.gray20};

  width: 100%;
  max-width: 100%;

  img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`;
