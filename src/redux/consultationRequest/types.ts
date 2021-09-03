interface ConsultationRequest {
  name: string
  phone: string
  email: string
  _id: string
  receivedIn: string
}

export type TRequest = {
  requests: ConsultationRequest[]
  loadeble: boolean
}
