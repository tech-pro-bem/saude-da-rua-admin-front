/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import nextIcon from '../../assets/next.svg';
import prevIcon from '../../assets/previous.svg';
import { useVolunteers } from '../../contexts/volunteersContext';

export default function Pagination() {
  const { volunteersList, fetchVolunteersListByPage } = useVolunteers();

  const [pages, setPages] = useState([]);
  const [currentSelectedPage, setCurrentSelectedPage] = useState(1);

  useEffect(() => {
    if (volunteersList.length) {
      const numberOfPages = 3;
      const pagesList = Array(numberOfPages).fill('').map((_, index) => index + 1);
      setPages(pagesList);
    }
  }, [volunteersList]);

  async function selectPage(page) {
    if (!page || typeof page !== 'number') return;

    try {
      await fetchVolunteersListByPage(page);
      setCurrentSelectedPage(page);
    } catch (error) {
      console.log(error);
    }
  }

  async function selectPreviousPage() {
    if (currentSelectedPage === 1) return;

    const previousPage = currentSelectedPage - 1;
    selectPage(previousPage);
  }

  async function selectNextPage() {
    if (currentSelectedPage === pages.length) return;

    const nextPage = currentSelectedPage + 1;
    selectPage(nextPage);
  }

  if (!pages.length) return <div />;

  return (
    <div className="h-8 flex items-center gap-1">
      <button
        type="button"
        onClick={selectPreviousPage}
        disabled={currentSelectedPage === 1}
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
          ${currentSelectedPage === page ? 'bg-dark-blue text-base' : 'text-primary-black'}`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={selectNextPage}
        disabled={currentSelectedPage === pages.length}
        title="Próxima página"
        className="disabled:cursor-not-allowed"
      >
        <img src={nextIcon} alt="Ícone de seta para a direita" />
      </button>
    </div>
  );
}
