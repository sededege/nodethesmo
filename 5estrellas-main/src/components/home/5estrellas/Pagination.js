/* eslint-disable react/prop-types */
import React from 'react'

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }
  return (
    <div className='w-full text-center flex gap-5 justify-end pt-10 pb-20'>
        {
            pages.map((page, index) => {
              return <button onClick={() => setCurrentPage(page)} className={`${currentPage === page ? 'text-white bg-pike3' : 'text-booty bg-white border-2 border-booty'} w-8 h-8  rounded-full`} key={index}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination