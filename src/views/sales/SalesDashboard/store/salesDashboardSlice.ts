import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import {apiGetSalesDashboardData} from "@/services/SalesService";
import {useSelector} from "react-redux";

type Statistic = {
    value: number
    growShrink: number
}

export type DashboardData = {
    statisticData?: {
        revenue: Statistic
        orders: Statistic
        purchases: Statistic
        productLive: Statistic
        totalCustomer: Statistic
        skuLive: Statistic
        dispatched: Statistic
        delivered: Statistic
        sum_a2c: Statistic
        views: Statistic
        avg_dispatch: Statistic
        avg_delivered: Statistic
    }
    salesReportData?: {
        series: {
            name: string
            data: number[]
        }[]
        categories: string[]
    }
    customerReportData?: {
        series: {
            name: string
            data: number[]
        }[]
        categories: string[]
    }
    topProductsData?: {
        id: string
        name: string
        img: string
        sold: number
    }[]
    latestOrderData?: {
        id: string
        date: number
        customer: string
        status: number
        paymentMehod: string
        paymentIdendifier: string
        totalAmount: number
    }[]
    salesByCategoriesData?: {
        labels: string[]
        data: number[]
    }
}

type DashboardDataResponse = DashboardData

export type SalesDashboardState = {
    startDate: number
    endDate: number
    loading: boolean
    dashboardData: DashboardData
}

export type DatePickerFilter = {
    'startDate' : number,
    'endDate': number,
    vendorId : string
    sourceId : string | null
}

export const SLICE_NAME = 'salesDashboard'
export const getSalesDashboardData = createAsyncThunk(
    SLICE_NAME + '/getSalesDashboardData',
    async (data: DatePickerFilter) => {
        const response = await apiGetSalesDashboardData<DashboardDataResponse,DatePickerFilter>(data)
        return response.data
    }
)

const initialState: SalesDashboardState = {
    startDate: dayjs(
        dayjs().subtract(7, 'days').format('DD-MMM-YYYY, hh:mm A')
    ).unix(),
    endDate: dayjs(new Date()).subtract(1,'day').unix(),
    loading: true,
    dashboardData: {},
}

const salesDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStartDate: (state, action: PayloadAction<number>) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action: PayloadAction<number>) => {
            state.endDate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSalesDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getSalesDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setStartDate, setEndDate } = salesDashboardSlice.actions

export default salesDashboardSlice.reducer
