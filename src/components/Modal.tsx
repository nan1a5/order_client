import React from "react";

interface ModalProps {
    size?: 'sm' | 'md' | 'lg';
    title?: string;
    children?: any;
    onClose?: React.MouseEventHandler;
}

const Modal: React.FC<ModalProps> = ({
    size = 'md',
    title = 'Modal',
    children,
    onClose
}) => {
    let height;
    let width;
    switch (size) {
        case 'sm':
            height = '250px';
            width = '350px'
            break;
        case 'md':
            height = '300px';
            width = '400px';
            
            break;
        case 'lg':
            height = '400px';
            width = '600px';
            break;
        default:
            height = '400px';
            width = '600px';
            break;
    }

    return (
        <div className="modal-background">
            <div className="modal-wrapper" style={{height: height, width: width}}>
                <div className="modal-header">
                    <div className="modal-title">
                        <span>{title}</span>
                    </div>
                    <div className="modal-close" onClick={onClose}>
                        <span className="icon icon-cross"></span>
                    </div>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;