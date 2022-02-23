import Modal from "antd/lib/modal/Modal"
import useActions from './../../hooks/useActions'

const UnbindModal = ({client, flat, setModalContent}) => {

  const { unbindClient } = useActions()

  const onApply = async () => {
    await unbindClient(client.bindId)
    setModalContent(false)
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