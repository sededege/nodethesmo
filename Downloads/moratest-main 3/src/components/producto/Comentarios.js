import React from 'react'

const Comentarios = (c) => {
  const comentarios = c.comentarios

  return (
        <div className='py-5'>
          {/*   {
                comentarios && comentarios.length > 0

                  ? <Slider
                        autoplaySpeed={5000}
                    >
                        {comentarios.map(a =>
                            <div key={a.id} className='flex items-center justify-center gap-4'>
                               <div className='flex flex-col'>
                                    <p>{a.nombre}</p>
                                    <Rating
                                        name="simple-controlled"
                                        value={a.rate}

                                        sx={{
                                          '& .MuiRating-iconFilled': {
                                            color: '#ffb381'
                                          },
                                          '& .MuiRating-iconHover': {
                                            color: 'purple'
                                          }
                                        }}
                                    />
                                    <p>{a.msg}</p>
                                </div>
                            </div>
                        )}

                    </Slider> : <></>
             } */}
        </div>

  )
}

export default Comentarios
