import { Form, Input, Modal } from "antd"
import { useState } from 'react';
import useApi from './../../hooks/useApi';


const ClientForm = ({ item = null, flatID, setModalContent }) => {

  const [form] = Form.useForm()
  const $api = useApi()

  const validateMessages = {
    required: '${label} Обязательно к заполнению!',
    types: {
      email: '${label} неправильно введен email!'
    }
  }

  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const onFinish = () => {
    console.log(fields)
    $api.post('HousingStock/client', {
      Name: fields.name,
      Phone: fields.phone,
      Email: fields.email,
      BindId: flatID
    })
      .then(res => {
        $api.put('/HousingStock/bind_client', {
          AddressId: flatID,
          ClientId: res.data.id
        })
          .then(() => {
            setModalContent(false)
          })
      })
  }
  return (
    <Modal
      onOk={form.submit}
      onCancel={() => setModalContent(false)}
      visible={true}>
      <Form
        form={form}
        name="nest-messages"
        validateMessages={validateMessages}
        onFinish={onFinish}>
        <Form.Item name={['user', 'name']} label="Имя клиента">
          <Input onChange={e => setFields({ ...fields, name: e.target.value })} />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
          <Input onChange={e => setFields({ ...fields, email: e.target.value })} />
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="Номер телефона" rules={[{ required: true }]}>
          <Input onChange={e => setFields({ ...fields, phone: e.target.value })} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ClientForm