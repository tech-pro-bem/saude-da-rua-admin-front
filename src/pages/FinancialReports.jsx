/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from '../components/Modal';
import ToastContainer from '../components/Toast/ToastContainer';
import { useToast } from '../contexts/toastContext';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import trashIcon from '../assets/trash.svg';
import downloadIcon from '../assets/download.svg';
import fileIcon from '../assets/file.svg';
import closeIcon from '../assets/close_red.svg';

export default function Volunteers() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deleteStaging, setDeleteStaging] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { addToast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    }
  });

  const removeFile = (file, files) => files.filter((f) => f !== file);

  const prepareToDelete = (itemId) => {
    setDeleteStaging(itemId);
    setIsModalOpen(true);
  };

  const deleteItem = () => {
    // logic to erase file here
    console.log(deleteStaging);
    setIsModalOpen(false);
  };

  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return `${parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  async function getFiles() {
    try {
      setFileList([
        { id: 1, name: 'a', url: 'https' },
        { id: 2, name: 'b', url: 'https' },
        { id: 3, name: 'c.jpeg', url: 'https' }
      ]);
    } catch (error) {
      addToast('error');
    }
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <AuthenticatedLayout>
      <main className="w-full min-h-screen mr-[190px] mb-16">
        <div className="mt-16 mb-10">
          <h1 className="font-semibold text-[32px] leading-[48px] text-dark-blue">
            Relatórios Financeiros
          </h1>
          <span className="leading-6 text-primary-black">Escolha um ou mais arquivos para adicionar à base de relatórios</span>
        </div>

        <div>
          <div
            className="mb-8 flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            {...getRootProps()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-dark-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <div className="mb-2 text-center text-sm text-blue-500">
                  <p>Arraste o arquivo ou</p>
                  <p className="font-semibold">Clique Aqui</p>
                </div>
                <p className="text-xs text-gray-500">Imagens, PDFs</p>
            </div>
            <input {...getInputProps()} />
          </div>

          <div className="mt-0">
              {selectedFiles.map((data, i) => (
                <div className="bg-gray-100 m-4 p-8 inline-flex items-center" key={i}>
                  <img src={fileIcon} alt="Ícone de arquivo" />
                  <div className="ml-2 mr-16 my-0">
                    <span className="block">{data.name}</span>
                    <span className="block">{fileSize(data.size)}</span>
                  </div>
                  <button className="cursor-pointer" type="button" onClick={() => setSelectedFiles(removeFile(data, selectedFiles))}>
                    <img src={closeIcon} alt="Cancelar" />
                  </button>
                </div>
              ))}
          </div>

          <button
            className="py-4 px-24 w-full bg-dark-blue text-base font-bold rounded-full hover:bg-blue-500 disabled:bg-light-grey disabled:text-medium-grey disable:cursor-not-allowed"
            type="button"
            disabled={selectedFiles.length === 0}
          >
            Enviar
          </button>
        </div>
        <div className="mt-12">
          <h2 className="font-semibold text-[28px] leading-[48px] text-dark-blue">Base de Relatórios</h2>
          <table className="w-full shadow-lg">
            <thead>
              <tr>
                <td className="bg-dark-blue text-ultra-light-grey font-semibold">
                  Arquivo
                </td>
                <td className="text-center bg-dark-blue text-ultra-light-grey font-semibold">
                  Ações
                </td>
              </tr>
            </thead>
            <tbody>
              {fileList.map((item, index) => (
                <tr key={item.id} className={`h-16 ${index % 2 === 0 ? 'bg-base' : 'bg-light-grey'}`}>
                  <td>{item.name}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button title="Baixar arquivo" type="button">
                        <img src={downloadIcon} alt="Ícone de página com conteúdo escrito" />
                      </button>
                      <button type="button" title="Apagar arquivo" onClick={() => prepareToDelete(item.id)}>
                        <img src={trashIcon} alt="Ícone de lixeira" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onCommit={deleteItem}
        confirmationTitle="Confirmar ação"
        cancelButtonText="Cancelar"
        confirmationButtonText="Sim, excluir"
      >
        <span>Deseja mesmo realizar essa exclusão?</span>
      </Modal>
      <ToastContainer />
    </AuthenticatedLayout>
  );
}
