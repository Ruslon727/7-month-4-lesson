import React, { useState } from 'react';
import { Table } from 'antd';

const CustomTable = ({ tHead, tBody, isLoading }) => {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    })
    function handleTableChange(a) {
        setTableParams({
            pagination:a
        })
    }
    return (
        <Table pagination={tableParams.pagination} onChange={handleTableChange} loading={isLoading} className='shadow-md shadow-[#8b6400] rounded-lg' columns={tHead} dataSource={tBody} />
    )
};
export default CustomTable;