import Modal from "antd/lib/modal/Modal"
import useApi from "../../hooks/useApi"

const UnbindModal = ({client, flat, setModalContent}) => {

  const $api = useApi()

  const onApply = () => {
    console.log(client)
    $api.delete(`HousingStock/bind_client/${client.bindId}`)
    .then(() => {
      setModalContent(false)
    })
  }

  return (
    <Modal
      onOk={onApply}
      onCancel={() => setModalContent(false)}
      visible={true}>
      <p>Выселить: {client.name} из квартиры: {flat.flat}</p>
    </Modal>
  )
}

export default UnbindModal