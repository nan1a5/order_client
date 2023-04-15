import React, { useEffect } from "react";
import Modal from "../components/Modal";
import ReactDOM from "react-dom/client";



export function useModal(size: 'sm' | 'md' | 'lg' = 'md', title: string = 'Modal') {
    const [isShowing, setIsShowing] = React.useState(false);
    const [children, setChildren] = React.useState<String | React.ReactNode | Number | HTMLElement>();

    function toggle(callback?: Function) {
        setIsShowing(!isShowing);
        if (callback) {
            callback();
        }
    }

    function setContent(content: String | React.ReactNode | Number | HTMLElement ) {
        setChildren(content);
    }

    const close: React.MouseEventHandler = (e) => {
        toggle();
    }

    useEffect(() => {
        // 根据 isShowing 的值来决定是否渲染 Modal
        if (isShowing) {
            const modal = document.createElement('div');
            modal.id = 'modal';
            document.body.appendChild(modal);
            ReactDOM.createRoot(
                document.getElementById('modal') as HTMLElement
            ).render(
                <Modal size={size} title={title} onClose={close}>
                    {children}
                </Modal>
            );
        } else {
            const modal = document.getElementById('modal');
            if (modal) {
                document.body.removeChild(modal);
            }
        }
    }, [isShowing]);

    return {
        setContent,
        toggle,
    };
}