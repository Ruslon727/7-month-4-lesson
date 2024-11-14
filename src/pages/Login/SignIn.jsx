import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useAxios } from '../../hook/useAxios'
import { Context } from '../../context/Context'
import toast, { Toaster } from 'react-hot-toast';
import { LoadingOutlined, LoginOutlined } from '@ant-design/icons';

const SignIn = () => {
  const [token, setToken] = useContext(Context)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsloading] = useState(false)

  const onFinish = () => {
    const data = { username, password }
    setIsloading(true)
    useAxios().get("/users").then(res => {
      const isUser = res.data.some(item => item.username == data.username && item.password == data.password)
      if (isUser) {
        setTimeout(() => {
          setIsloading(false)
          toast.success("Xush kelibsiz " + data.username)
          setToken(data)

        }, 1000);
      }
      else {
        setTimeout(() => {
          setIsloading(false)
        }, 1000);
        toast.error("Foydalanuvchi topilmadi!")
        setUsername("")
        setPassword("")
      }
    })
  };
  return (
    <div className='w-full h-[100hv] relative mt-[250px]'>
      <Toaster position='top-center' reverseOrder={false} />
      <Form
        className='absolute inset-0 h-[800px]] m-auto space-y-4'
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Input value={username} required placeholder='Ismingizni kiriting' onChange={(e) => setUsername(e.target.value)} name="username" size='large' />
        <Input.Password value={password} required placeholder='Parol kiriting' onChange={(e) => setPassword(e.target.value)} name="password" size='large' />
        <Button icon={isLoading ? <LoadingOutlined /> : <LoginOutlined/> } size='large' className='w-full' type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>

  )
};
export default SignIn;