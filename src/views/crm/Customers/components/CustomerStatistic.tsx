import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import Loading from '@/components/shared/Loading'
import { getCustomerStatistic, useAppDispatch, useAppSelector } from '../store'
import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import type { ReactNode } from 'react'
import {DashboardDataSingle, OrderInfo, ProductInfo, ShoppersInfo, SkuInfo} from "@/views/crm/CrmDashboard/store";

type StatisticCardProps = {
    icon: ReactNode
    avatarClass: string
    label: string
    value?: number
    loading: boolean
}

const StatisticCard = (props: StatisticCardProps) => {
    const { icon, avatarClass, label, value,  loading } = props

    const avatarSize = 55

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumericFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={value}
                                />
                            </h3>
                        </div>
                    </div>
                    {/*<GrowShrinkTag value={growthRate} suffix="%" />*/}
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = ({ ShoppersInfo, OrderInfo, SkuInfo, ProductInfo }: DashboardDataSingle) => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Live Sku's"
                value={SkuInfo.total_skus_live}
                loading={false}
            />
            <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Sku with Complete Details"
                value={SkuInfo.total_skus_complete_details}
                loading={false}
            />
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Sku with Competitive Price"
                value={SkuInfo.total_skus_competitive_prices}
                loading={false}
            /><StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Sku with Competitive Price"
                value={SkuInfo.total_skus_competitive_prices}
                loading={false}
            /><StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Sku with Competitive Price"
                value={SkuInfo.total_skus_competitive_prices}
                loading={false}
            /><StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Sku with Competitive Price"
                value={SkuInfo.total_skus_competitive_prices}
                loading={false}
            /><StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Sku with Competitive Price"
                value={SkuInfo.total_skus_competitive_prices}
                loading={false}
            /><StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Sku with Competitive Price"
                value={SkuInfo.total_skus_competitive_prices}
                loading={false}
            /><StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Sku with Competitive Price"
                value={SkuInfo.total_skus_competitive_prices}
                loading={false}
            />
        </div>
    )
}

export default CustomerStatistic
