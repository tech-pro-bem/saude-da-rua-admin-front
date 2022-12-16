/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import nextIcon from '../../assets/next.svg';
import prevIcon from '../../assets/previous.svg';
import { useToast } from '../../contexts/toastContext';

export default function Pagination({
  numberOfPages,
  currentPage,
  setCurrentPage,
  getVolunteers,
}) {
  const { addToast } = useToast();
  const pages = Array(numberOfPages).fill('').map((_, index) => index + 1);

  async function selectPage(page) {
    if (!page || typeof page !== 'number') return;

    const searchPage = page - 1;
    try {
      await getVolunteers(searchPage);
      setCurrentPage(page);
    } catch (error) {
      addToast('error');
    }
  }

  async function selectPreviousPage() {
    if (currentPage === 1) return;

    const previousPage = currentPage - 1;
    selectPage(previousPage);
  }

  async function selectNextPage() {
    if (currentPage === pages.length) return;

    const nextPage = currentPage + 1;
    selectPage(nextPage);
  }

  if (!pages.length) return <div />;

  return (
    <div className="h-8 flex items-center gap-1">
      <button
        type="button"
        onClick={selectPreviousPage}
        disabled={currentPage === 1}
        title="Página anterior"
        className="disabled:cursor-not-allowed"
      >
        <img src={prevIcon} alt="Ícone de seta para a esquerda" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => selectPage(page)}
          title={`Página ${page}`}
          className={`h-8 w-8 rounded-[4px] border border-light-grey font-semibold
          ${currentPage === page ? 'bg-dark-blue text-base' : 'text-primary-black'}`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={selectNextPage}
        disabled={currentPage === pages.length}
        title="Próxima página"
        className="disabled:cursor-not-allowed"
      >
        <img src={nextIcon} alt="Ícone de seta para a direita" />
      </button>
    </div>
  );
}
