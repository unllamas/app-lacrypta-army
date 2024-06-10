import { ViewportStyle } from './style';

export default function Viewporty(props) {
  const { children } = props;

  return <ViewportStyle>{children}</ViewportStyle>;
}
