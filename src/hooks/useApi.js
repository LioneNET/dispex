import axios from "axios"
import apiConfig from "../configs/apiConfig"

const useApi = () => {

  const $api = axios.create({
    baseURL: apiConfig.baseAPI
  })

  return $api
}

export default useApi