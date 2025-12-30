import { useEffect } from 'react'
import reducer, {
    CrmDashboardState,
    getCrmDashboardData,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store/'

import Loading from '@/components/shared/Loading'
import Statistic from './components/Statistic'
import LeadByCountries from './components/LeadByCountries'
import EmailSent from './components/EmailSent'
import CustomerStatistic from "@/views/crm/Customers/components/CustomerStatistic";

injectReducer('crmDashboard', reducer)
// injectReducer('crmCustomers', reducer)

const CrmDashboard = () => {
    const dispatch = useAppDispatch()

    const {   ProductInfo,OrderInfo,ShoppersInfo, SkuInfo } =
        useAppSelector((state) => state.crmDashboard.data.dashboardData)
    const loading = useAppSelector((state) => state.crmDashboard.data.loading)
    const fetchData = () => {
        dispatch(getCrmDashboardData())
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(ProductInfo,SkuInfo)
    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <Statistic data={ProductInfo} />
                <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                    <EmailSent className="xl:col-span-2" data={SkuInfo} />
                    {/*<LeadByCountries*/}
                    {/*    className="xl:col-span-5"*/}
                    {/*    data={leadByRegionData}*/}
                    {/*/>*/}
                    <div className="xl:col-span-5">
                        <CustomerStatistic  OrderInfo={OrderInfo} ProductInfo={ProductInfo} ShoppersInfo={ShoppersInfo} SkuInfo={SkuInfo} />
                    </div>
                </div>
                {/*<Leads data={users} />*/}
            </Loading>
        </div>
    )
}

export default CrmDashboard
