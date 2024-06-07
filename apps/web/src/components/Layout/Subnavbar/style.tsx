import { styled } from 'styled-components';

interface SubnavbarProps {}

export const SubnavbarPrimitive = styled.div<SubnavbarProps>`
  position: fixed;
  bottom: 0;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 60px; */

  padding: 12px 0 32px 0;

  background-color: ${(props) => props.theme.colors.gray15};
  border-radius: 20px 20px 0 0;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  button {
    flex: 1;
  }

  /* .info {
    display: flex;
    justify-content: center;

    padding: 0 24px;

    > button {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      border: none;
      background-color: transparent;

      cursor: pointer;

      &.active {
        svg {
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
  } */
`;
