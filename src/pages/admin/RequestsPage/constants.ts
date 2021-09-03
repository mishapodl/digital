export enum RequestsFields {
  email = 'email',
  telegram = 'chatId',
}

export const RequestsFormConfig = [
  { field: RequestsFields.email, title: 'Посилання на пошту' },
  { field: RequestsFields.telegram, title: 'Посилання на телеграм' },
]

export const RequestsFormOptions = {
  [RequestsFields.email]: { required: false },
  [RequestsFields.telegram]: { required: false },
}
