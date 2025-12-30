import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import { HiOutlineCog } from 'react-icons/hi'
import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
import type { CommonProps } from '@/@types/common'
import ModeSwitcher from "@/components/template/ThemeConfigurator/ModeSwitcher";
import ThemeSwitcher from "@/components/template/ThemeConfigurator/ThemeSwitcher";

type SidePanelProps = SidePanelContentProps & CommonProps

const _SidePanel = (props: SidePanelProps) => {
    const dispatch = useAppDispatch()

    const { className, ...rest } = props

    const panelExpand = useAppSelector((state) => state.theme.panelExpand)

    const direction = useAppSelector((state) => state.theme.direction)

    const openPanel = () => {
        dispatch(setPanelExpand(true))
    }

    const closePanel = () => {
        dispatch(setPanelExpand(false))
        const bodyClassList = document.body.classList
        if (bodyClassList.contains('drawer-lock-scroll')) {
            bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
        }
    }

    return (
        <>
            <div
                className={classNames('text-2xl', className)}
                onClick={openPanel}
                {...rest}
            >
                <HiOutlineCog />
            </div>
            <Drawer
                title="Setting"
                isOpen={panelExpand}
                placement={direction === 'rtl' ? 'left' : 'right'}
                width={375}
                onClose={closePanel}
                onRequestClose={closePanel}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h6>Dark Mode</h6>
                        <span>Switch theme to dark mode</span>
                    </div>
                    <ModeSwitcher />
                </div>
                {/*<div>*/}
                {/*    <h6 className="mb-3">Theme</h6>*/}
                {/*    <ThemeSwitcher />*/}
                {/*</div>*/}
            </Drawer>
        </>
    )
}

const SidePanel = withHeaderItem(_SidePanel)

export default SidePanel
