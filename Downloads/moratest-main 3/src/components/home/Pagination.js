/* eslint-disable react/prop-types */
import React from 'react'

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }
  return (
    <div className='w-full text-center flex gap-5 justify-center  '>
        {
            pages.map((page, index) => {
              return <button onClick={() => setCurrentPage(page)} className={`${currentPage === page ? 'text-white bg-booty' : 'text-booty bg-white border-2 border-booty'} w-8 h-8  rounded-md`} key={index}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination
