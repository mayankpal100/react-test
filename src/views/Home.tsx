import { useParams } from 'react-router-dom';
import reducer, {setSourceId, useAppDispatch, useAppSelector} from "@/views/sales/Vendor/store";
import {useEffect} from "react";
import {injectReducer} from "@/store";
import isEmpty from "lodash/isEmpty";
injectReducer('vendorData', reducer)

const Home = () => {
    // const { sourceId  } = useParams()

    // const dispatch = useAppDispatch()

    // const source = useAppSelector(
    //     (state) => state.vendorData.data.sourceId
    // )
    // useEffect(() => {
    //
    //     if(sourceId != null){
    //         dispatch(setSourceId(sourceId))
    //     }
    // }, [sourceId]);
    // if(id)
    // {
    //  const [VendorId, setVendorId] = useState(null)
    //  setVendorId(id)
    // }
    return <>
    Home </>
}

export default Home
