import { Modal } from "antd";
import closeIcon from "@/assets/close-circle.svg";
import type { ModalProps } from "antd";

export default function CustomModal(props: ModalProps): React.ReactElement {
  const { children } = props;

  return (
    <Modal closeIcon={<img src={closeIcon} alt="close" />} {...props}>
      {children}
    </Modal>
  );
}
