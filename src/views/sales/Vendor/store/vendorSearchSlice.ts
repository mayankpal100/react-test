import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {apiGetVendorData} from "@/services/SalesService";

type VendorDataResponse = VendorData

export type VendorState = {
    loading: boolean
    vendorList: VendorData[]
    selectedValue: string | null
    sourceId: string | null
}
type VendorData = {
    id:             string
    brand_id:       string
    source_id:      string
    name:           string
    brand_name:     string
    image:          null | string
    desktop_banner: null | string
    mobile_banner:  null | string
    created_at:     string
    active:         string
}
export const SLICE_NAME = 'vendorData'

export const getVendorData = createAsyncThunk(
    SLICE_NAME + '/getVendorData',
    async (source: number) => {
        const response = await apiGetVendorData<VendorDataResponse[],any>(source)
        return response.data
    }
)

const initialState: VendorState = {
    loading: true,
    vendorList: [],
    selectedValue: null,
    sourceId: null
}

const vendorSearchSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setSelectedValue: (state, action: PayloadAction<string | null>) => {
            state.selectedValue = action.payload;
        },
        setSourceId: (state, action: PayloadAction<string | null>) => {
            state.sourceId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVendorData.fulfilled,(state,action) => {
                state.vendorList = action.payload
                state.loading = false
            }).addCase(getVendorData.pending,(state) => {
            state.loading = true
             })
    },
})

// export const selectVendorData = (state: { dropdown: VendorState }) => state.dropdown.vendorList;
// export const selectLoading = (state: { dropdown: VendorState }) => state.dropdown.loading;
// export const selectError = (state: { dropdown: VendorState }) => state.dropdown.error;

export const {setSelectedValue,setSourceId} = vendorSearchSlice.actions
export const getSelectedValue = (state: { dropdown: VendorState }) => state.dropdown.selectedValue;
export const getSourceId = (state: { dropdown: VendorState }) => state.dropdown.sourceId;
// export const selectSelectedValue = (state: { dropdown: VendorState }) => state.dropdown.selectedValue;

export default vendorSearchSlice.reducer
