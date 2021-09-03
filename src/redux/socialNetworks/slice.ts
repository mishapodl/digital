import { createSlice, SerializedError } from '@reduxjs/toolkit'

import { socialNetworksRequest, updateSocialNetworks } from './thunks'
// import { socialNetworksRequest } from './thunks'

type FormDataElemType = {
  changedAt: string
  _id: string
  iconFileName: string
  url: string
  __v: number
}

export type FormDataType = Array<FormDataElemType>

type InitialStateType = {
  pending: boolean
  error: null | SerializedError
  formData: FormDataType | []
}

const initialState: InitialStateType = {
  pending: false,
  error: null as SerializedError | null,
  formData: [],
}

const socialNetwork = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    setData(state, action) {
      state.formData = action.payload.formDara
    },
    clearField(state, action) {
      //todo удалить екшн
      console.log(state, action)
      console.log('Da rabodsfsdfdsfta')
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(socialNetworksRequest.pending, (state) => {
      state.pending = true
    })
    addCase(socialNetworksRequest.fulfilled, (state, payload) => {
      state.pending = false
      // todo correct the error TS
      // @ts-ignore
      const data: FormDataType = payload.payload

      console.log(payload)
      console.log(data)
      state.formData = data
    })
    addCase(socialNetworksRequest.rejected, (state, { error }) => {
      state.pending = false
      state.error = error
    })

    addCase(updateSocialNetworks.pending, (state) => {
      state.pending = true
    })
    addCase(updateSocialNetworks.fulfilled, (state, { payload }) => {
      state.pending = false

      console.log(payload)
      state.formData = payload
    })
    addCase(updateSocialNetworks.rejected, (state, { error }) => {
      state.error = error
    })
  },
})

export const { setData, clearField } = socialNetwork.actions
export const socialNetworkReducer = socialNetwork.reducer
