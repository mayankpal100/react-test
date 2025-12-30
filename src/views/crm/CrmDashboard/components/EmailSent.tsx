import Card from '@/components/ui/Card'
import Progress from '@/components/ui/Progress'
import type { SkuInfo} from '../store'

type EmailSentProps = {
    data?: Partial<SkuInfo>
    className?: string
}

const ProgressInfo = ({ precent }: { precent?: number }) => {
    return (
        <div>
            <h3 className="font-bold">{precent}%</h3>
            <p>Opened</p>
        </div>
    )
}

const EmailSent = ({ data = {} , className }: EmailSentProps) => {
   return     <Card className={className} >
            <h4>Total Sku</h4>
            <div className="mt-6">
                <Progress
                    variant="circle"
                    percent={data.total_skus}
                    width={200}
                    className="flex justify-center"
                    strokeWidth={4}
                    customInfo={<ProgressInfo precent={data.total_skus_live} />}
                />
            </div>
            <div className="text-center mt-6">
                <p className="font-semibold">Performace</p>
                <h4 className="font-bold">Average</h4>
            </div>
        </Card>

}

export default EmailSent
