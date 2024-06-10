import { styled } from 'styled-components';

export const ViewportStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr 86px 0px;

  height: 100%;
  min-height: 100dvh;

  > div:nth-child(1) {
    grid-area: 1 / 1 / 2 / 2;
  }

  > div:nth-child(2) {
    grid-area: 2 / 1 / 3 / 2;
  }

  > div:nth-child(3) {
    grid-area: 3 / 1 / 4 / 2;
  }

  > aside {
    overflow: hidden;
    grid-area: 4 / 1 / 5 / 2;
  }

  @media screen and (min-width: 1025px) {
    display: grid;
    grid-template-columns: 280px 1fr 320px;
    grid-template-rows: 60px 1fr;
    width: 100%;
    max-width: 1280px;

    margin: 0 auto;

    > div:nth-child(1) {
      grid-area: 1 / 2 / 2 / 3;
    }

    > div:nth-child(2) {
      grid-area: 2 / 2 / 3 / 3;

      width: 100%;
    }

    > div:nth-child(3) {
      grid-area: 1 / 1 / 3 / 2;

      display: flex;
      justify-content: end;
      border-right: 1px solid ${(props) => props.theme.colors.gray20};
    }

    > aside {
      grid-area: 1 / 3 / 3 / 4;

      border-left: 1px solid ${(props) => props.theme.colors.gray20};
    }
  }
`;
