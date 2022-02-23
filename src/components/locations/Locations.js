import { Button, Card, Col, Empty, Layout, message, Row, Select, Space } from 'antd'
import useActions from '../../hooks/useActions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClientForm from './ClientForm';
import UnbindModal from './UnbindModal';


const Locations = () => {

  const flatType = {
    HOUSE: 1,
    ENTRANCE: 2,
    FLAT: 3
  }

  const [location, setLocation] = useState(null)
  const [house, setHouse] = useState(null)
  const [number, setNumber] = useState(null)

  const [modalContent, setModalContent] = useState(false)

  const { getLocations, getHouses, getHouseFlats, getClients, setClients } = useActions()
  const isLocationLoading = useSelector(state => state.locations.isLoading)
  const locationItems = useSelector(state => state.locations.items)
  const isHousesLoading = useSelector(state => state.houses.isLoading)
  const houseItems = useSelector(state => state.houses.items)
  const isHouseFlatsLoading = useSelector(state => state.houseFlats.isLoading)
  const houseFlatItems = useSelector(state => state.houseFlats.items)
  const clientItems = useSelector(state => state.clients.items)

  const clientError = useSelector(state => state.clients.error)
  const houseFlatError = useSelector(state => state.houseFlats.error)
  const housesError = useSelector(state => state.houses.error)
  const locationsError = useSelector(state => state.locations.error)

  const { Option } = Select;

  useEffect(() => {
    getLocations()
  }, [])

  useEffect(() => {
    [clientError, houseFlatError, housesError, locationsError].forEach(error => {
      if (error) {
        message.error(error)
      }
    })
  }, [clientError, houseFlatError, housesError, locationsError])

  useEffect(() => {
    if (number) {
      getClients(number)
    }
  }, [modalContent])

  const onChangeLocation = value => {
    setClients([])
    setLocation(value)
    setHouse(null)
    setNumber(null)
    getHouses(value)
  }
  const onChangeHouse = value => {
    setClients([])
    getHouseFlats(value)
    setHouse(value)
    setNumber(null)
  }

  const onChangeHouseFlat = value => {
    getClients(value)
    setNumber(value)
  }
  const addClientHandler = () => {
    setModalContent(<ClientForm flatID={number} setModalContent={setModalContent} />)
  }

  const unbindClient = client => {
    const flat = houseFlatItems.find(item => item.id === number)
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
          disabled={location === null || housesError}
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
          disabled={house === null || houseFlatError}
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
          disabled={number === null || houseFlatError}>Добавить</Button>
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