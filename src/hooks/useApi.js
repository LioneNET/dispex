import axios from "axios"
import apiConfig from "../configs/apiConfig"

const useApi = () => {

  const $api = axios.create({
    baseURL: apiConfig.baseAPI
  })

  $api.interceptors.response.use(response => {
    return response
  })

  $api.interceptors.request.use(request => {
    return request
  })

  return $api
}

export default useApi