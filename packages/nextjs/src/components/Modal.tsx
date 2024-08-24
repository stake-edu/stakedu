import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => (
  <>
    <div
      className="fixed inset-0 z-[110] bg-[rgba(65,65,85,0.8)]"
      onClick={onClose}
    />
    <div className="fixed left-1/2 top-1/2 z-[120] -translate-x-1/2 -translate-y-1/2 transform">
      {children}
    </div>
  </>
);

export default Modal;
