import { createAsyncThunk } from '@reduxjs/toolkit'

import { adaptResToAllPackages, adaptToReqPackageNames, adaptToReqPackageServices } from './../../helpers/dal'
import { TAllPackages, TResAllPackages, TResQuote, TDataPackagesNames, TDataPackages } from './types'

import { instance } from '../../helpers'

export const getServiceQuote = createAsyncThunk('service/quote', async () => {
  const { data, status } = await instance.get<TResQuote>('/page/services/intro')
  return { quote: data.languages, status }
})

export const updateQuote = createAsyncThunk('service/quote/update', async (_data: TResQuote) => {
  const { data, status } = await instance.put('/page/services/intro', _data)
  return { quote: data.languages, status }
})

export const getPackages = createAsyncThunk(
  'service/packages/get',
  async (): Promise<TAllPackages> => {
    const { data } = await instance.get<TResAllPackages>('/page/services/packages')
    return adaptResToAllPackages(data)
  }
)

export const updatePackageNames = createAsyncThunk(
  'service/packages/names/update',
  async (values: TDataPackagesNames): Promise<TAllPackages> => {
    const _data = adaptToReqPackageNames(values)
    const { data } = await instance.put<TResAllPackages>('/page/services/packages', _data)
    return adaptResToAllPackages(data)
  }
)

export const updatePackageServices = createAsyncThunk(
  'service/packages/services/update',
  async ({ values, packagesData }: { values: TDataPackages; packagesData: TAllPackages }): Promise<TAllPackages> => {
    const _data = adaptToReqPackageServices({ ...packagesData, services: values.services, prices: values.prices })
    const { data } = await instance.put<TResAllPackages>('/page/services/packages', _data as TResAllPackages)
    return adaptResToAllPackages(data)
  }
)
