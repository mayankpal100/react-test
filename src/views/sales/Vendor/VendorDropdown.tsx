import {CommonProps} from "@/@types/common";
import {Select} from "@/components/ui/Select";
import {useEffect, useState} from "react";
import { injectReducer } from '@/store'
import reducer, {getVendorData, setSelectedValue, useAppDispatch, useAppSelector} from "@/views/sales/Vendor/store";
import AsyncSelect from "react-select/async";
import Loading from "@/components/shared/Loading";
import isEmpty from "lodash/isEmpty";
injectReducer('vendorData', reducer)

const VendorDropdown = ({ className }: CommonProps) => {
  const dispatch = useAppDispatch()

    const vendorData = useAppSelector(
        (state) => state.vendorData.data.vendorList
    )
    const loading = useAppSelector(
        (state) => state.vendorData.data.loading
    )
    const selectedValue = useAppSelector(
        (state) => state.vendorData.data.selectedValue
    )
    const sourceId = useAppSelector(
        (state) => state.auth.session.token
    )

    useEffect(() => {
        fetchData()
    }, [sourceId])

    useEffect(() => {

        if(vendorData.length > 0){
            dispatch(setSelectedValue(vendorData[0].id))
        }
    }, [vendorData]);


    const fetchData = () => {
        if(!isEmpty(sourceId))
        {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(getVendorData(sourceId))
        }

    }
    const options = vendorData.map((item) => ({
        value: item.id,
        label: item.name
    }));
    const filterText = (inputValue: any) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    }

    const loadOptions = (inputValue: any, callback: any) => {
        setTimeout(() => {
            callback(filterText(inputValue))
        }, 1000)
    }

        const [Vendor, setVendor] = useState('')

        const handleInputChange = (newValue: any) => {
            // const inputValue = newValue.replace(/\W/g, '')
            dispatch(setSelectedValue(newValue.value))
            setVendor(newValue.value)
            return newValue
        }
    // console.log(_)
        return (
            <>
                <Loading loading={loading}>
                    <Select
                        className="min-w-[200px] dark:text-white"
                        placeholder="Vendor Search"
                        size={'sm'}
                        cacheOptions
                        // loadOptions={loadOptions}
                        defaultValue={[options[0]]}
                        // onInputChange={handleInputChange}
                        // componentAs={AsyncSelect}
                        onChange={handleInputChange}
                        options={options}
                    />
                </Loading>
            </>
        )
    }


// const VendorDropdown = WithHeaderItem(_VendorDropdown)
export default VendorDropdown