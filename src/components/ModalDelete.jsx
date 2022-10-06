import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Trash from '../assets/trash.svg';

function ModalDelete() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button type="button">
          <img src={Trash} alt="trash" />
        </button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <h2>Remover usuário</h2>
        </Dialog.Title>
        <Dialog.Description>
          <p>Tem certeza que deseja remover este usuário?</p>
          <div>
            <button type="button">Cancelar</button>
            <button type="button">Sim, remover</button>
          </div>
        </Dialog.Description>
      </Dialog.Content>
      <Dialog.Overlay />
    </Dialog.Root>
  );
}

export default ModalDelete;
