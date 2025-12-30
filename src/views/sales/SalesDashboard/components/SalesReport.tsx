import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'

type SalesReportProps = {
    data?: {
        series?: {
            name: string
            data: number[]
        }[]
        categories?: string[]
    }
    className?: string,
    title: string
    type: 'line' | 'bar' | 'area' | 'donut'
}

const SalesReport = ({ className,title, type, data = {} }: SalesReportProps) => {
    return (
        <Card className={className}>
            <div className="flex items-center justify-between">
                <h4>{title}</h4>
                {/*<Button size="sm">Export Report</Button>*/}
            </div>
            <Chart
                series={data.series}
                xAxis={data.categories}
                height="380px"
                customOptions={{ legend: { show: true } }}
                type={type}
            />
        </Card>
    )
}

export default SalesReport
