/* eslint-disable react/prop-types */
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

function ModalDelete({
  text,
  onCommit,
  confirmationTitle = 'Confirmar Ação',
  cancelButtonText = 'Cancelar',
  confirmationButtonText = 'Confirmar',
  open,
  setOpen,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-primary-black/20 backdrop-blur-sm" />
      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[555px] bg-base shadow-lg">
        <Dialog.Title className="bg-primary-black py-4 px-6 text-[22px] font-semibold text-[#FBFBFB] leading-[33px]">
          {confirmationTitle}
        </Dialog.Title>
        <Dialog.Description className="p-6 text-[18px] leading-[27px]">
          {text}
        </Dialog.Description>
        <div className="flex items-center justify-center gap-4 pb-6">
          <Dialog.Close asChild>
            <button
              type="button"
              className="py-3 px-16 border-[1.5px] h-12 border-primary-black rounded-full text-primary-black font-bold"
            >
              {cancelButtonText}
            </button>
          </Dialog.Close>
          <button
            type="button"
            className="py-3 px-16 border-[1.5px] h-12 bg-error border-error rounded-full text-base font-bold"
            onClick={onCommit}
          >
            {confirmationButtonText}
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ModalDelete;
