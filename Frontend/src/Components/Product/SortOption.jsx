import React from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOption = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  function handleInput(e){
    const sortBy = e.target.value;
    searchParams.set("sortBy",sortBy)
    setSearchParams(searchParams)
  }
  return (
    <div className='flex items-center justify-end mb-4'>
     <select 
     value={searchParams.get("sortBy")||""}
     onChange={handleInput} 
     name="" id="sort" className='border p-1 rounded-md focus:outline-none'>
      <option value="">Default</option>
      <option value="priceAsc">Price :Low to high</option>
      <option value="priceDes">Price :high to low</option>
      
      <option value="popularity">Popularity</option>
     </select>
    </div>
  )
}

export default SortOption
