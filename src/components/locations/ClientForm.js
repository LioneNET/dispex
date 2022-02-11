import { Form, Input, Modal } from "antd"
import { useState } from 'react';
import useApi from './../../hooks/useApi';


const ClientForm = ({ client = null, flatID = null, setModalContent }) => {

  const [form] = Form.useForm()
  const $api = useApi()

  const validateMessages = {
    required: '${label} Обязательно к заполнению!',
    types: {
      email: '${label} неправильно введен email!'
    }
  }

  const [fields, setFields] = useState({
    Name: client ? client.name : '',
    Email: client ? client.email : '',
    Phone: client ? client.phone : ''
  })

  const onFinish = () => {
    if (client) {
      $api.post('HousingStock/client', {
        Id: client.id,
        Name: fields.Name,
        Phone: fields.Phone,
        Email: fields.Email
      })
      .then(() => {
        setModalContent(false)
      })
    } else {
      $api.post('HousingStock/client', {
        Name: fields.Name,
        Phone: fields.Phone,
        Email: fields.Email
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
        <Form.Item name={['user', 'name']} label="Имя клиента" initialValue={fields.Name}>
          <Input onChange={e => setFields({ ...fields, Name: e.target.value })} />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]} initialValue={fields.Email}>
          <Input onChange={e => setFields({ ...fields, Email: e.target.value })} />
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="Номер телефона" rules={[{ required: true }]} initialValue={fields.Phone}>
          <Input onChange={e => setFields({ ...fields, Phone: e.target.value })} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ClientForm