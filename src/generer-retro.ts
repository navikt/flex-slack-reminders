import { genererUkeData } from './common/genererUkeOversikt'
import { lagFil } from './common/util/fil'

const data = genererUkeData('retro')
lagFil('retro', data)
