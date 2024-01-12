'use client';

import { getAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ToursList from './ToursList';
import { useState } from 'react';

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data, isPending } = useQuery({
    queryKey: ['tours', searchValue],
    queryFn: () => getAllTours(searchValue),
  });
  
  return <>
  <form className='max-w-lg mb-12'>
    <div className='join w-full'>
    <input type="text" className='input input-bordered w-full join-item' placeholder='enter city or country...' value={searchValue} required onChange={(e)=>{setSearchValue(e.target.value)}}/>
    <button className='btn btn-primary join-item' type='button' disabled={isPending} onClick={()=>{setSearchValue('')}}>{isPending? 'please wait': 'search'}</button>
    </div>
  </form>
  
  {isPending ? <span className="loading"></span> : <ToursList data={data}/>}</>;
};
export default ToursPage;
