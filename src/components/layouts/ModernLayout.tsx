import Header from '@/components/template/Header'
import SidePanel from '@/components/template/SidePanel'
import UserDropdown from '@/components/template/UserDropdown'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import SideNav from '@/components/template/SideNav'
import View from '@/views'
import LanguageSelector from "@/components/template/LanguageSelector";
import VendorDropdown from "@/views/sales/Vendor/VendorDropdown";
import {Switcher} from "@/components/ui/Switcher";
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import {ReactNode, useCallback} from "react";
import useDarkMode from "@/utils/hooks/useDarkmode";
const HeaderActionsStart = () => {
    return (
        <>
            <MobileNav />
            <SideNavToggle />
        </>
    )
}

const HeaderActionsEnd = () => {
    const withIcon = (component: ReactNode) => {
        return <div className="text-lg">{component}</div>
    }
    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = useCallback(
        (checked: boolean) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark]
    )
    return (
        <>
            <VendorDropdown  />
            {/*<LanguageSelector/>*/}
            {/*<SidePanel />*/}
            <div className='py-2 px-3 flex items-center gap-4' >
                <Switcher
                    unCheckedContent={withIcon(<RiMoonClearLine />)}
                    checkedContent={withIcon(<RiSunLine />)}
                    defaultChecked={isDark}
                    onChange={(checked) => onSwitchChange(checked)}
                />
            </div>

            <UserDropdown hoverable={false} />
        </>
    )
}

const ModernLayout = () => {
    return (
        <div className="app-layout-modern flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                    <Header
                        className="border-b border-gray-200 dark:border-gray-700"
                        headerEnd={<HeaderActionsEnd />}
                        headerStart={<HeaderActionsStart />}
                    />
                    <View />
                </div>
            </div>
        </div>
    )
}

export default ModernLayout
