import { Modal } from "@nextui-org/react";

export default function DonateSucessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <div>fdsfs</div>
    </Modal>
  );
}
