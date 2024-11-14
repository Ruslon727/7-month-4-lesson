import { Input, Modal, Select, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import PageInfo from '../components/PageInfo'
import CustomTable from '../components/CustomTable'
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useDebounce from '../hook/useDebounce'
import { usePath } from '../hook/usePath'
import { useAxios } from '../hook/useAxios'
import { useNavigate } from 'react-router-dom'

function Organization() {
  const [tBodyData, setTBodyData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [innData, setInnData] = useState([])
  const [searchData, setSearchData] = useState("")
  const navigate = useNavigate()

  function handleChangeSwitch(item, e) {
    item.status = e
    useAxios().put(`/organization/${item.id}`, item).then(res => {
      setRefresh(!refresh)
    })
  }


  const tHeadData = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
    },
    {
      title: 'Inn',
      dataIndex: 'inn',
    },
    {
      title: 'Direktor',
      dataIndex: 'director',
    },
    {
      title: 'Yaratilgan vaqt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'Manzil',
      dataIndex: 'adress',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];

  function handleSearchOrganization(e) {
    setIsLoading(true)
    setSearchData(e.target.value.toLowerCase())
    if (!e.target.value) {
      setTimeout(() => setRefresh(!refresh), 1000)
    }
  }
  const searchByName = useDebounce(searchData, 1000)

  useEffect(() => {
    if (searchByName) {
      setIsLoading(false)
      const filteredData = tBodyData.filter(item => item.name.toLowerCase().includes(searchByName))
      setTBodyData(filteredData)
    }
  }, [searchByName])

  const [innId, setInnId] = useState("")
  function handleInnSelectChange(e) {
    setIsLoading(true)
    setTimeout(() => {
      setInnId(e)
    }, 1000);
  }

  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  function handleDelete(id) {
    setDeleteModal(true)
    setDeleteId(id)
  }

  function handleSureDelete() {
    setDeleteModal(false)
    setIsLoading(true)
    useAxios().delete(`/organization/${deleteId}`).then(res => {
      setTimeout(() => {
        setIsLoading(false)
        setRefresh(!refresh)
      }, 1000);
    })
  }

  useEffect(() => {
    useAxios().get(`/organization?id=${innId ? innId : ""}`).then(res => {
      setIsLoading(false)
      setTBodyData(res.data.map((item, index) => {
        item.action = <div className='flex items-center gap-5'>
          <DashOutlined onClick={() => navigate(`${item.id}`)} className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-blue-500' />
          <EditOutlined onClick={() => navigate(`/edit/${item.id}`)} className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-green-500' />
          <DeleteOutlined onClick={() => handleDelete(item.id)} className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-red-500' />
        </div>
        item.key = index + 1
        item.status = <Switch onChange={(e) => handleChangeSwitch(item, e)} size='small' checked={item.status} />
        return item
      }))
    })
  }, [refresh, innId])

  useEffect(() => {
    useAxios().get("/organization").then(res => {
      setInnData(res.data.map(item => {
        const data = {
          label: item.inn,
          value: item.id
        }
        return data
      }))
    })
  }, [])


  return (
    <div className='p-5'>
      <PageInfo addPath={usePath.organizationAdd} title={"Tashkilotlar"} btnTitle={"Qo'shish"} count={5} subtitle={"tashkilotlar"} />
      <div className='my-5 flex items-center gap-5'>
        <Input onChange={handleSearchOrganization} placeholder='Qidirish...' type='text' size='large' allowClear className='w-[300px]' />
        <Select
          allowClear
          onChange={handleInnSelectChange}
          showSearch
          placeholder="Inn tanlang"
          optionFilterProp='label'
          size='large'
          className='w-[300px]'
          options={innData}
        />
      </div>
      <div>
        <CustomTable isLoading={isLoading} tBody={tBodyData} tHead={tHeadData} />
      </div>
      <Modal onOk={handleSureDelete} title="O'chirmoqchimisiz?" open={deleteModal} onCancel={() => setDeleteModal(false)} />
    </div>
  )
}

export default Organization