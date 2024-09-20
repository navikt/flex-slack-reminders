import { genererUkeData } from './common/genererUkeOversikt'
import { lagFil } from './common/util/fil'

const data = genererUkeData('flexjar')
lagFil('flexjar', data)
