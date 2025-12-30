import Card from '@/components/ui/Card'
import { NumericFormat } from 'react-number-format'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import { useAppSelector } from '../store'
import dayjs from 'dayjs'

type StatisticCardProps = {
    data?: {
        value: number
        growShrink: number
    }
    label: string
    valuePrefix?: string
    date: number
}

type Statistic = {
    value: number
    growShrink: number
}
type StatisticProps = {
    data?: {
        revenue?: Statistic
        orders?: Statistic
        productLive?: Statistic
        totalCustomer?: Statistic
        skuLive?: Statistic
        dispatched?: Statistic
        delivered?: Statistic
        sum_a2c?: Statistic
        views?: Statistic
        avg_dispatch?: Statistic
        avg_delivered?: Statistic
    }
}

const StatisticCard = ({
    data = { value: 0, growShrink: 0 },
    label,
    valuePrefix,
    date,
}: StatisticCardProps) => {
    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumericFormat
                            thousandSeparator
                            displayType="text"
                            value={data.value != null ? Number(data.value).toFixed(0) : "N/A"}
                            prefix={valuePrefix}
                        />
                    </h3>
                    {/*<p>*/}
                    {/*    vs. 3 months prior to{' '}*/}
                    {/*    <span className="font-semibold">*/}
                    {/*        {dayjs(date).format('DD MMM')}*/}
                    {/*    </span>*/}
                    {/*</p>*/}
                </div>
                {/*<GrowShrinkTag value={data.growShrink} suffix="%" />*/}
            </div>
        </Card>
    )
}


const Statistic = ({ data = {} }: StatisticProps) => {
    const startDate = useAppSelector(
        (state) => state.salesDashboard.data.startDate
    )
    const endDate = useAppSelector(
        (state) => state.salesDashboard.data.endDate
    )
   let aov = 0;
    if(data?.orders != null && data?.revenue != null)
    {
        aov = data.revenue.value / data?.orders.value;
    }
    return (
        <>
            <p>
                {' '}
                As on{' '}
                <span className="font-semibold">
                    {dayjs().subtract(1,'day').format('DD MMM YYYY')}{' '}
                </span>{' '}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <StatisticCard
                    data={data?.productLive}
                    label="Total Product Live"
                    date={startDate}
                />
                <StatisticCard
                    data={data?.skuLive}
                    label="Total Sku Live"
                    date={startDate}
                />
            </div>
            <hr className="my-6" />
            <p>
                {' '}
                Cumulative for {dayjs
                    .unix(startDate)
                    .format('DD MMM YYYY')} -{' '}
                {dayjs.unix(endDate).format('DD MMM YYYY')}{' '}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <StatisticCard
                    data={data.revenue}
                    valuePrefix="₹"
                    label="Total Order Value"
                    date={startDate}
                />

                <StatisticCard
                    data={data?.orders}
                    label="Total Order"
                    date={startDate}
                />
                <StatisticCard
                    data={{ value: aov, growShrink: 0 }}
                    label="AOV"
                    date={startDate}
                />

                <StatisticCard
                    data={data?.dispatched}
                    label="Total Dispatched"
                    date={startDate}
                />
                <StatisticCard
                    data={data?.delivered}
                    label="Total Delivered"
                    date={startDate}
                />
                <StatisticCard
                    data={data?.sum_a2c}
                    label="Total Add to Cart"
                    date={startDate}
                />
                <StatisticCard
                    data={data?.views}
                    label="Total Product Clicks"
                    date={startDate}
                />
                <StatisticCard
                    data={data?.avg_dispatch}
                    label="AVG Dispatch Time (Days)"
                    date={startDate}
                />
                <StatisticCard
                    data={data?.avg_delivered}
                    label="AVG Delivery Time (Days)"
                    date={startDate}
                />
            </div>
        </>
    )
}

export default Statistic
