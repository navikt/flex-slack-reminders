import { genererUkeData } from './common/genererUkeOversikt'
import { lagFil } from './common/util/fil'

const data = genererUkeData('prod')
lagFil('prod', data)
