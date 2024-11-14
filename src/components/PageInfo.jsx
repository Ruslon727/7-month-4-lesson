import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageInfo({title, subtitle, count, btnTitle, addPath}) {
    const navigate = useNavigate();
    return (
        <div className='flex items-center  justify-between'>
            <div className='flex flex-col'>
                <h2 className='font-bold text-[25px]'>{title}</h2>
                <span className='text-slate-500 text-[15px] pl-1'>{subtitle} ({count})</span>
            </div>
            <Button onClick={() => navigate(addPath)} size='large' type='primary'>{btnTitle}</Button>
        </div>)
}

export default PageInfo