import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import OrganizationMoreItem from '../components/OrganizationMoreItem'

function OrganizationMore() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [singleData, setSingleData] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    function handleCheckSwitch(e) {
        singleData.status = e
        useAxios().put(`/organization/${id}`, singleData).then(res => {
            setRefresh(!refresh)
        })
    }

    useEffect(() => {
        useAxios().get(`/organization/${id}`).then(res => {
            setSingleData(res.data)
        })
    }, [refresh])



    // Delete part start
    const [deleteModal, setDeleteModal] = useState(false)

    function handleSureDelete() {
        setDeleteModal(false)
        setIsLoading(true)
        useAxios().delete(`/organization/${id}`).then(res => {
            setTimeout(() => {
                setIsLoading(false)
                navigate(-1)
            }, 1500);
        })
    }

    function handleDeleteBtnClick() {
        setDeleteModal(true)
    }

    // Delete part end
    return (
        <div className='p-5'>
            <div className='flex mb-5 items-center justify-between'>
                <div className='flex items-center space-x-5 '>
                    <ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.5] cursor-pointer' />
                    <h2 className='font-bold text-[22px]'>{singleData.name}</h2>
                </div>
                <div className='flex items-center space-x-2'>
                    <Switch onChange={handleCheckSwitch} checked={singleData.status} size='large' />
                    <Button onClick={handleDeleteBtnClick} icon={isLoading ? <LoadingOutlined/> : <DeleteOutlined />} size='large' className='delete-btn' type='primary'>Delete</Button>
                    <Button onClick={() => navigate(`/edit/${id}`)} icon={<EditOutlined />} size='large' className='update-btn' type='primary'>Update</Button>
                </div>
            </div>
            <div className='flex justofy-between w-[70%]'>
                <ul className='w-[49%] space-y-5 p-5 rounded-md border-[2px] border-slate-500 '>
                    <OrganizationMoreItem spanTitle={"ID"} strongTitle={singleData.id} />
                    <OrganizationMoreItem spanTitle={"Nomi"} strongTitle={singleData.name} />
                    <OrganizationMoreItem spanTitle={"Inn"} strongTitle={singleData.inn} />
                    <OrganizationMoreItem spanTitle={"Holati"} strongTitle={singleData.status ? "Faol" : "Faol emas"} />
                </ul>
                <ul className='w-[49%] space-y-5 p-5 rounded-md border-[2px] border-slate-500'>
                    <OrganizationMoreItem spanTitle={"Direktor"} strongTitle={singleData.director} />
                    <OrganizationMoreItem spanTitle={"Manzil"} strongTitle={singleData.address} />
                    <OrganizationMoreItem spanTitle={"Yaratilgan vaqt"} strongTitle={singleData.createdAt} />
                </ul>
            </div>
            <Modal onOk={handleSureDelete} title="O'chirmoqchimisiz?" open={deleteModal} onCancel={() => setDeleteModal(false)} />
        </div>
    )
}

export default OrganizationMore