import React from 'react';
import './components.scss';

interface DialogProps {
    size?: 'sm' | 'md' | 'lg';
    title?: string;
    msg?: string;
    onConfirm?: React.MouseEventHandler;
    onCancel?: React.MouseEventHandler;
}

const Dialog: React.FC<DialogProps> = ({
    size = 'md',
    title = 'Dialog',
    msg = 'Dialog',
    onConfirm,
    onCancel
}) => {
    let height;
    let width;
    switch (size) {
        case 'sm':
            height = '150px';
            width = '250px'
            break;
        case 'md':
            height = '200px';
            width = '300px';
            
            break;
        case 'lg':
            height = '300px';
            width = '400px';
            break;
        default:
            height = '400px';
            width = '600px';
            break;
    }


    return (
        <div className="dialog">
            <div className="dialog-wrapper" style={{height, width}}>
                <div className="dialog-header">
                    <div className="dialog-title">
                        <span>{title}</span>
                    </div>
                </div>
                <div className="dialog-body">
                    <p>{msg}</p>
                </div>
                <div className="dialog-footer">
                    <button className="dialog-btn" onClick={onConfirm}>Confirm</button>
                    <button className="dialog-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;