import { styled } from 'styled-components';

export const ContentStyle = styled.div`
  overflow-x: auto;

  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100dvh - 146px);

  @media screen and (min-width: 1023px) {
    max-height: calc(100dvh - 60px);
  }
`;
