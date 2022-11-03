/* eslint-disable react/prop-types */
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Trash from '../assets/trash.svg';

function ModalDelete({
  text,
  onCommit,
  confirmationTitle = 'Confirmar Ação',
  cancelButtonText = 'Cancelar',
  confirmationButtonText = 'Confirmar',
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button type="button">
          <img src={Trash} alt="trash" />
        </button>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-primary-black/20 backdrop-blur-sm" />
      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[555px] bg-base shadow-lg">
        <Dialog.Title className="bg-primary-black py-4 px-6">
          <h2 className="text-[22px] font-semibold text-[#FBFBFB] leading-[33px]">
            { confirmationTitle }
          </h2>
        </Dialog.Title>

        <Dialog.Description className="p-6">
          <p className="text-[18px] leading-[27px] pb-6">
            { text }
          </p>
          <div className="flex items-center justify-center gap-4">
            <Dialog.Close asChild>
              <button
                type="button"
                className="py-3 px-16 border-[1.5px] h-12 border-primary-black rounded-full text-primary-black font-bold"
              >
                { cancelButtonText }
              </button>
            </Dialog.Close>
            <button
              type="button"
              className="py-3 px-16 border-[1.5px] h-12 bg-error border-error rounded-full text-base font-bold"
              onClick={onCommit}
            >
              { confirmationButtonText }

            </button>
          </div>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ModalDelete;
