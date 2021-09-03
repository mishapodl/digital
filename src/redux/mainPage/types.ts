import { MongoItem, TLanguage } from '../../helpers/types'

export type TResMainPage = MongoItem & TLanguage<{ content: string }>
export type TResMainPagePUT = TLanguage<{ content: string }>['languages']
