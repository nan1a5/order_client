import React, { useEffect } from "react";
import Dialog from "../components/Dialog";
import ReactDOM from "react-dom/client";



export function useDialog(size: 'sm' | 'md' | 'lg' = 'md') {
    const [isShowing, setIsShowing] = React.useState(false);
    const [title, setTitle] = React.useState('Dialog');
    const [msg, setMsg] = React.useState('Dialog');
    // const [children, setChildren] = React.useState<String | React.ReactNode | Number | HTMLElement>();
    const fn = () => {};
    const [confirm_cb, setConfirm_cb] = React.useState<Function>(() => () => fn());
    const [cancel_cb, setCancel_cb] = React.useState<Function>(() => () => fn());
    

    const show = (opts={title: 'Dialog',msg: 'Dialog'},_confirm_cb?: Function, _cancel_cb?: Function) => {
        setIsShowing(!isShowing);
        setTitle(opts.title);
        setMsg(opts.msg);
        if (_confirm_cb) {
           setConfirm_cb(() =>() => _confirm_cb());
        }
        if (_cancel_cb) {
            setCancel_cb(() =>() => _cancel_cb());
        }
    }


    const onConfirm: React.MouseEventHandler = (e) => {
        confirm_cb();
        setIsShowing(false);
    }

    const onCancel: React.MouseEventHandler = (e) => {
        cancel_cb();
        setIsShowing(false);
    }

    useEffect(() => {
        // 根据 isShowing 的值来决定是否渲染 Modal
        if (isShowing) {
            const dialog = document.createElement('div');
            dialog.id = 'dialog';
            document.body.appendChild(dialog);
            ReactDOM.createRoot(
                document.getElementById('dialog') as HTMLElement
            ).render(
                <Dialog title={title} msg={msg} size={size} onConfirm={onConfirm} onCancel={onCancel} />
            );
        } else {
            const dialog = document.getElementById('dialog');
            if (dialog) {
                document.body.removeChild(dialog);
            }
        }
    }, [isShowing]);

    return show;
}