import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'
import {
    setStartDate,
    setEndDate,
    getSalesDashboardData,
    useAppSelector, DatePickerFilter,
} from '../store'

import { useAppDispatch} from '@/store'
import { HiOutlineFilter } from 'react-icons/hi'
import dayjs from 'dayjs'
import VendorDropdown from "@/views/sales/Vendor/VendorDropdown";
import {useEffect} from "react";
import {getSourceId} from "@/views/sales/Vendor/store";

const dateFormat = 'MMM DD, YYYY'

const { DatePickerRange } = DatePicker

const SalesDashboardHeader = () => {
    const dispatch = useAppDispatch()

    const startDate = useAppSelector(
        (state) => state.salesDashboard.data.startDate
    )
    const endDate = useAppSelector((state) => state.salesDashboard.data.endDate)

    const selectedValue = useAppSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (state) => state.vendorData.data.selectedValue
    )
    const sourceId = useAppSelector(
        (state) => state.auth.session.token
    )


    const handleDateChange = (value: [Date | null, Date | null]) => {

        dispatch(setStartDate(dayjs(value[0]).unix()))
        dispatch(setEndDate(dayjs(value[1]).unix()))
        if(value[0] != null && value[1] != null)
        {

            const data: DatePickerFilter = {
                'startDate' : dayjs(value[0]).unix(),
                'endDate' : dayjs(value[1]).unix(),
                'vendorId': selectedValue,
                sourceId : sourceId
            }
            dispatch(getSalesDashboardData(data))
        }

    }

    const onFilter = () => {
        // dispatch(getSalesDashboardData())
    }
    const dateGap = 120

    const minDate = dayjs(new Date())
        .subtract(dateGap, 'day')
        .startOf('day')
        .toDate()
    const maxDate = dayjs(new Date()).subtract(1, 'day').toDate()
    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Sales Overview</h3>
                <p>View your current sales & summary</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                {/*<VendorDropdown/>*/}
                {/*<AsyncOnSearch/>*/}
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">

                <DatePickerRange
                    value={[
                        dayjs.unix(startDate).toDate(),
                        dayjs.unix(endDate).toDate(),
                    ]}
                    inputFormat={dateFormat}
                    size="sm"
                    onChange={handleDateChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    clearable={false}
                />
                <Button size="sm" icon={<HiOutlineFilter />} onClick={onFilter}>
                    Filter
                </Button>
            </div>
        </div>
    )
}

export default SalesDashboardHeader
