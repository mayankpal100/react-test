import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import SalesByCategories from './SalesByCategories'
import LatestOrder from './LatestOrder'
import TopProduct from './TopProduct'
import {DatePickerFilter, getSalesDashboardData, setEndDate, setStartDate, useAppSelector} from '../store'
import { useAppDispatch } from '@/store'
import dayjs from "dayjs";
import {useSelector} from "react-redux";
// import {selectSelectedValue} from "@/views/sales/Vendor/store";

const SalesDashboardBody = () => {
    const dispatch = useAppDispatch()

    const dashboardData = useAppSelector(
        (state) => state.salesDashboard.data.dashboardData
    )

    const loading = useAppSelector((state) => state.salesDashboard.data.loading)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const selectedVendor =  useAppSelector((state) => state.vendorData.data.selectedValue)
    const sourceId = useAppSelector(
        (state) => state.auth.session.token
    )
    useEffect(() => {
        if(selectedVendor != null && sourceId != null){
            fetchData(selectedVendor,sourceId)
        }
    }, [selectedVendor,sourceId])

    const fetchData = (vendorId: string, sourceId : string) => {
        const data: DatePickerFilter = {
            startDate: dayjs(
                dayjs().subtract(7, 'days').format('DD-MMM-YYYY, hh:mm A')
            ).unix(),
            endDate: dayjs(new Date()).unix(),
            vendorId: vendorId,
            sourceId: sourceId
        }
        dispatch(setStartDate(data.startDate))
        dispatch(setEndDate(data.endDate))
        dispatch(getSalesDashboardData(data))
    }

    return (
        <Loading loading={loading}>
            <Statistic data={dashboardData?.statisticData} />
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                <SalesReport
                    data={dashboardData?.salesReportData}
                    className="col-span-2"
                    title="Views Report"
                    type="bar"
                />
                {/*<SalesByCategories*/}
                {/*    data={dashboardData?.salesByCategoriesData}*/}
                {/*/>*/}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                <SalesReport
                    data={dashboardData?.customerReportData}
                    className="col-span-2"
                    title="Customer Report"
                    type="line"
                />
                {/*<SalesByCategories*/}
                {/*    data={dashboardData?.salesByCategoriesData}*/}
                {/*/>*/}
            </div>
            {/*<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">*/}
            {/*    <LatestOrder*/}
            {/*        data={dashboardData?.latestOrderData}*/}
            {/*        className="lg:col-span-2"*/}
            {/*    />*/}
            {/*    <TopProduct data={dashboardData?.topProductsData} />*/}
            {/*</div>*/}
        </Loading>
    )
}

export default SalesDashboardBody
