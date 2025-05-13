import { useSelector } from 'react-redux'
import { RootState } from '../../app/strore'

export const useAppSelector = useSelector.withTypes<RootState>()
