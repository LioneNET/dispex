import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import allActions from '../store/actions'

const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}

export default useActions