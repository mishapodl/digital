interface CVRequest {
  name: string
  phone: string
  cv: string
  _id: string
  receivedIn: string
}

export type TRequest = {
  requests: CVRequest[]
  loadeble: boolean
}
