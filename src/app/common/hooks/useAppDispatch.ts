import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../strore'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
