import { Button, Card, Col, Empty, Layout, Row, Select, Space } from 'antd'
import { useActions } from './../../hooks/useAction';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ClientForm from './ClientForm';

const Locations = () => {

    const [fields, setFields] = useState({
        location: null,
        house: null,
        number: null
    })
    const [modalContent, setModalContent] = useState(false)

    const { getLocations, getHouses, getHouseFlats, getClients } = useActions()
    const isLocationLoading = useSelector(state => state.locations.isLocationLoading)
    const locationItems = useSelector(state => state.locations.locationItems)
    const isHousesLoading = useSelector(state => state.locations.isLoadingHouses)
    const houseItems = useSelector(state => state.locations.houses)
    const isHouseFlatsLoading = useSelector(state => state.locations.isLoadingHouseFlat)
    const houseFlatItems = useSelector(state => state.locations.house_flats)
    const isLoadingClients = useSelector(state => state.HousingStock.isLoadingClients)
    const clientItems = useSelector(state => state.HousingStock.clientItems)

    const { Option } = Select

    useEffect(() => {
        getLocations()
    }, [])

    const onChangeLocation = value => {
        getHouses(value)
        setFields({ ...fields, location: value, house: null, number: null })
    }
    const onChangeHouse = value => {
        getHouseFlats(value)
        setFields({ ...fields, house: value, number: null })
    }
    const onChangeHouseFlat = value => {
        getClients(value)
        setFields({ ...fields, number: value })
    }
    const addClientHandler = ()=> {
        setModalContent(<ClientForm setModalContent={setModalContent} />)
    }

    return (
        <Layout className='main'>
            {modalContent}
            <Space>
                <Select
                    style={{width: 200}}
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
                    {locationItems.map(location => {
                        if(location.cityId === 1) {
                            return <Option key={location.id} value={location.id}>{location.name}</Option>
                        } else {
                            return false
                        }
                    })}
                </Select>

                <Select
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
                    {houseItems.map(location => {
                        return <Option key={location.id} value={location.id}>{location.name}</Option>
                    })}
                </Select>
                <Select
                    onChange={value => onChangeHouseFlat(value)}
                    disabled={fields.house === null}
                    loading={isHouseFlatsLoading}
                    showSearch
                    placeholder="Квартира"
                    optionFilterProp="children"
                    filterOption={
                        (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }>
                    {houseFlatItems.map(location => {
                        return <Option key={location.id} value={location.id}>{location.name}</Option>
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
                        return <Col key={'client_'+client.Id} span={8}>
                            <Card title={client.Name} bordered={false}>
                                {client.Phone}
                                {client.Email}
                            </Card>
                        </Col>
                    })}
                </Row>
                {!clientItems.length && <Row className='no-clients'><Empty description='Нет клиентов'/></Row>}
            </div>
        </Layout>
    )
}

export default Locations