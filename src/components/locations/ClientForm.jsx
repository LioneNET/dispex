import { Form, Input, Modal } from "antd"
import { useState } from 'react';


const ClientForm = ({ item = null, setModalContent }) => {

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
        //setModalContent(false)
    }
    return (
        <Modal
            onOk={onFinish}
            onCancel={()=>setModalContent(false)}
            visible={true}>
            <Form name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Имя клиента">
                    <Input onChange={e=>setFields({...fields, name: e.target.value})} />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input onChange={e=>setFields({...fields, email: e.target.value})} />
                </Form.Item>
                <Form.Item name={['user', 'phone']} label="Номер телефона" rules={[{ required: true }]}>
                    <Input onChange={e=>setFields({...fields, phone: e.target.value})} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ClientForm