import { AppstoreAddOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Checkbox, DatePicker, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import dayjs from 'dayjs'

function OrganizationAdd() {
    const { id } = useParams()
    const date = new Date()
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [inn, setInn] = useState("")
    const [director, setDirector] = useState("")
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState(false)
    const [createdAt, setCreatedAt] = useState(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`)
    const [isLoading, setIsLoading] = useState(false)
    const dateFormat = 'YYYY-MM-DD';

    function handleAddOrganization(e) {
        setIsLoading(true)
        e.preventDefault();
        const data = { name, inn, director, address, createdAt, status }
        if (id) {
            data.id = id
            useAxios().put(`/organization/${id}`, data).then(res => {
                setTimeout(() => {
                    toast.success("Saqlandi")

                }, 700);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate(-1)
                }, 2000);
            })
        }
        else {
            useAxios().post("/organization", data).then(res => {
                setTimeout(() => {
                    toast.success("Saqlandi")

                }, 700);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate(-1)
                }, 2000);
            })
        }

    }

    useEffect(() => {
        if (id) {
            useAxios().get(`/organization/${id}`).then(res => {
                setName(res.data.name)
                setInn(res.data.inn)
                setDirector(res.data.director)
                setAddress(res.data.address)
                setStatus(res.data.status)
                setCreatedAt(res.data.createdAt)
            })
        }
    }, [])

    return (
        <form onSubmit={handleAddOrganization} className='p-5'>
            <Toaster position='top-center' reverseOrder={false} />
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between gap-5'>
                    <ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.5] cursor-pointer' />
                    <h2 className='font-bold text-[22px]'>Tashkilot {id ? "Tahrirlash" : "Qo'shish"}</h2>
                </div>
                <Button htmlType='submit' icon={isLoading ? <LoadingOutlined /> : <AppstoreAddOutlined />} type='primary' size='large'>{id ? "Tahrirlash" : "Saqlash"}</Button>
            </div>
            <div className='mt-5 flex justify-between w-[70%]'>
                <div className='w-[49%] space-y-5 p-5 border-[1px] border-slate-400 rounded-md'>
                    <label className='flex flex-col'>
                        <span className='text-[15px] mb-1 text-slate-400'>Nom kiriting</span>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Nom kiriting' size='large' allowClear />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-[15px] mb-1 text-slate-400'>Inn kiriting</span>
                        <Input type='number' value={inn} onChange={(e) => setInn(e.target.value)} placeholder='Inn kiriting' size='large' allowClear />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-[15px] mb-1 text-slate-400'>Direktor ismini kiriting</span>
                        <Input value={director} onChange={(e) => setDirector(e.target.value)} placeholder='Ism kiriting' size='large' allowClear />
                    </label>
                </div>
                <div className='w-[49%] space-y-5 p-5 border-[1px] border-slate-400 rounded-md'>
                    <label className='flex flex-col'>
                        <span className='text-[15px] mb-1 text-slate-400'>Manzil kiriting</span>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Manzil kiriting' size='large' allowClear />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-[15px] mb-1 text-slate-400'>Yaratilgan vaqt</span>
                        <DatePicker value={dayjs(createdAt, dateFormat)} onChange={(a, b) => setCreatedAt(b)} size='large' placeholder='Vaqt kiriting' />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-[15px] mb-1 text-slate-400'>Holati</span>
                        <Checkbox checked={status} onChange={(a) => setStatus(a.target.checked)}>Holati</Checkbox>
                    </label>
                </div>
            </div>
        </form >
    )
}

export default OrganizationAdd