declare type DialogAction = 'confirm' | 'cancel';
declare type DialogOptions = {
    lang?: string;
    show?: boolean;
    title?: string;
    zIndex?: number;
    context?: any;
    message?: string;
    overlay?: boolean;
    selector?: string;
    ariaLabel?: string;
    transition?: string;
    asyncClose?: boolean;
    businessId?: number;
    sessionFrom?: string;
    appParameter?: string;
    messageAlign?: string;
    sendMessageImg?: string;
    showMessageCard?: boolean;
    sendMessagePath?: string;
    sendMessageTitle?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    closeOnClickOverlay?: boolean;
    confirmButtonOpenType?: string;
};

interface Dialog {
    alert?: (options: DialogOptions) => Promise<DialogAction>;
    confirm?: (options: DialogOptions) => Promise<DialogAction>;
    close?: () => void;
    stopLoading?: () => void;
    install?: () => void;
    setDefaultOptions?: (options: DialogOptions) => void;
    resetDefaultOptions?: () => void;
    defaultOptions?: DialogOptions;
    currentOptions?: DialogOptions;

    (options: DialogOptions): Promise<DialogAction>;
}

declare const Dialog: Dialog;
export default Dialog;
