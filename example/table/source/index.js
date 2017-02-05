import magritte from 'magritte'
import { storeModel } from './model'
import { Table } from './view'

const render = magritte('#root', Table)

render(storeModel)
