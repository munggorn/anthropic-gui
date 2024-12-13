declare module 'react-outside-click-handler' {
  import { ReactNode, Component } from 'react';

  interface Props {
    children: ReactNode;
    onOutsideClick: (event: MouseEvent | TouchEvent) => void;
    disabled?: boolean;
    useCapture?: boolean;
    display?: string;
  }

  export default class OutsideClickHandler extends Component<Props> {}
}
