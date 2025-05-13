import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/strore'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
