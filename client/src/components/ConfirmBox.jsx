import React from 'react'

const ConfirmBox = ({isOpen,onClose,onConfirm,message,confirmText="Confirm",cancelText="Cancel"}) => {
  if(!isOpen) return null;
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 px-4">
        <div className="surface-card w-full max-w-md p-6">
          <h2 className="text-lg font-semibold text-ink-950 mb-4">Please confirm</h2>
          <p className="mb-6 text-sm leading-7 text-ink-600">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              className="btn-secondary"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              className="btn-primary"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
  )
}

export default ConfirmBox
