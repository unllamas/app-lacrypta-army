import { styled } from 'styled-components';

export const SubnavbarPrimitive = styled.div<{
  $background: string;
}>`
  display: flex;
  align-items: center;
  width: 100%;

  padding: 12px 0 32px 0;

  background-color: ${(props) => props.$background};
  border-radius: 20px 20px 0 0;

  > div {
    display: flex;
    flex-direction: column;
  }

  button {
    flex: 1;
  }

  @media screen and (min-width: 1025px) {
    height: 100%;

    border-radius: 0px;

    button {
      padding: 0 16px;
    }
  }
`;
