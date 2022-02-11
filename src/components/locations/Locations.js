import { Button, Card, Col, Empty, Layout, Row, Select, Space } from 'antd'
import useActions from '../../hooks/useActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ClientForm from './ClientForm';
import UnbindModal from './UnbindModal';


const Locations = () => {

  const flatType = {
    HOUSE: 1,
    ENTRANCE: 2,
    FLAT: 3
  }

  const [fields, setFields] = useState({
    location: null,
    house: null,
    number: null
  })
  const [modalContent, setModalContent] = useState(false)

  const { getLocations, getHouses, getHouseFlats, getClients } = useActions()
  const isLocationLoading = useSelector(state => state.locations.isLoading)
  const locationItems = useSelector(state => state.locations.items)
  const isHousesLoading = useSelector(state => state.houses.isLoading)
  const houseItems = useSelector(state => state.houses.items)
  const isHouseFlatsLoading = useSelector(state => state.houseFlats.isLoading)
  const houseFlatItems = useSelector(state => state.houseFlats.items)
  const isLoadingClients = useSelector(state => state.clients.isLoading)
  const clientItems = useSelector(state => state.clients.items)

  const { Option } = Select

  const dispatch = useDispatch()

  useEffect(() => {
    getLocations()
  }, [])

  useEffect(() => {
    if (fields.number) {
      getClients(fields.number)
    }
  }, [modalContent])

  const onChangeLocation = value => {
    dispatch({ type: 'clients/set.items', data: [] })
    getHouses(value)
    setFields({ ...fields, location: value, house: null, number: null })
  }
  const onChangeHouse = value => {
    dispatch({ type: 'clients/set.items', data: [] })
    getHouseFlats(value)
    setFields({ ...fields, house: value, number: null })
  }
  const onChangeHouseFlat = value => {
    getClients(value)
    setFields({ ...fields, number: value })
  }
  const addClientHandler = () => {
    setModalContent(<ClientForm flatID={fields.number} setModalContent={setModalContent} />)
  }

  const unbindClient = client => {
    const flat = houseFlatItems.find(item => item.id === fields.number)
    setModalContent(<UnbindModal flat={flat} client={client} setModalContent={setModalContent} />)
  }

  const editClient = client => {
    setModalContent(<ClientForm client={client} setModalContent={setModalContent} />)
  }

  return (
    <Layout className='main'>
      {modalContent}
      <Space>
        <Select
          style={{ minWidth: 200 }}
          onChange={value => onChangeLocation(value)}
          loading={isLocationLoading}
          showSearch
          placeholder="Улица"
          optionFilterProp="children"
          filterOption={
            (input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }>
          {locationItems.map(location => (
            <Option key={location.id} value={location.id} disabled={location.cityId !== 1}>{location.name}</Option>)
          )}
        </Select>

        <Select
          style={{ minWidth: 200 }}
          onChange={value => onChangeHouse(value)}
          disabled={fields.location === null}
          loading={isHousesLoading}
          showSearch
          placeholder="Дом"
          optionFilterProp="children"
          filterOption={
            (input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }>
          {houseItems.map(house => {
            return <Option key={house.id} value={house.id}>{house.name}</Option>
          })}
        </Select>
        <Select
          style={{ minWidth: 200 }}
          onChange={value => onChangeHouseFlat(value)}
          disabled={fields.house === null}
          loading={isHouseFlatsLoading}
          showSearch
          placeholder="Квартира"
          optionFilterProp="children"
          filterOption={
            (input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {houseFlatItems.map(houseFlat => {
            return <Option disabled={houseFlat.typeId !== flatType.FLAT} key={houseFlat.id} value={houseFlat.id}>{houseFlat.name}</Option>
          })}
        </Select>
        <Button
          onClick={addClientHandler}
          type='primary'
          disabled={fields.number === null}>Добавить</Button>
      </Space>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {clientItems.map(client => {
            return <Col key={client.id} span={8}>
              <Card title={client.name} bordered={false} className='my-card'>
                <p>{client.phone}</p>
                <p>{client.email}</p>
                <Button type='danger' onClick={() => unbindClient(client)} style={{ marginRight: 10 }}>Отвязать</Button>
                <Button type='primary' onClick={() => editClient(client)}>Изменить</Button>
              </Card>
            </Col>
          })}
        </Row>
        {!clientItems.length && <Row className='no-clients'><Empty description='Нет клиентов' /></Row>}
      </div>
    </Layout>
  )
}

export default Locations