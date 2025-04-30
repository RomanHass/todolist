import { useSelector } from 'react-redux'
import { RootState } from '../../strore'

export const useAppSelector = useSelector.withTypes<RootState>()
