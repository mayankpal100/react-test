import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiGetCrmDashboardData, apiGetProductsData} from '@/services/CrmService'



export interface DashboardData {
    OrderInfo: OrderInfo[]
    ProductInfo: ProductInfo[]
    ShoppersInfo: ShoppersInfo[]
    SkuInfo: SkuInfo[]

}
export interface DashboardDataSingle {
    OrderInfo?: OrderInfo
    ProductInfo?: ProductInfo
    ShoppersInfo?: ShoppersInfo
    SkuInfo?: SkuInfo

}

export interface OrderInfo {
    id: number
    brand_id: number
    date_period: number
    total_dispatch_count: number
    avg_dispatch_time: number
    total_delivery_count: number
    avg_delivery_time: number
    total_order_value: number
    created_time: Date
    updated_time: Date
}

export interface ProductInfo {
    id: string
    brand_id: string
    date_period: string
    total_products_live: string
    total_impressions: number
    total_add_to_cart: string
    created_time: string
    updated_time: string
}

export interface ShoppersInfo {
    id: string
    brand_id: string
    date_period: string
    total_new_shoppers: string
    total_repeated_shoppers: string
    created_time: string
    updated_time: string
}
export interface SkuInfo {
    id: string
    brand_id: number
    date_period: string
    total_skus: number
    total_skus_live: number
    total_skus_complete_details: number
    total_skus_competitive_prices: number
    created_time: string
    updated_time: string
}


type CrmDashboardDataResponse = DashboardData;

export type CrmDashboardState = {
    loading: boolean
    dashboardData: Partial<DashboardDataSingle>
}

export const SLICE_NAME = 'crmDashboard'

export const getCrmDashboardData = createAsyncThunk(
    'crmDashboard/data/getCrmDashboardData',
    async () => {
        const response = await apiGetCrmDashboardData<CrmDashboardDataResponse>()
        return {
            OrderInfo: response.data.OrderInfo[0],
            ProductInfo: response.data.ProductInfo[0],
            ShoppersInfo: response.data.ShoppersInfo[0],
            SkuInfo: response.data.SkuInfo[0]
        }
    }
)


const initialState: CrmDashboardState = {
    loading: true,
    dashboardData: {},
}

const crmDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCrmDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getCrmDashboardData.pending, (state) => {
                state.loading = true
            }).addCase(getCrmDashboardData.rejected, (state) => {
            state.loading = true
        })
    },
})

export default crmDashboardSlice.reducer
