import React from 'react'

function OrganizationMoreItem({spanTitle, strongTitle}) {
    return (
        <li className='flex flex-col'>
            <span className='text-[15px] text-slate-400'>{spanTitle}</span>
            <strong className='text-[20px] '>{strongTitle}</strong>
        </li>
    )
}

export default OrganizationMoreItem