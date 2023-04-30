import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import classNames from '../lib/dynamicStyling';


function PopoverLayout({ buttonContent, childContent, popoverStyling }) {

    return (
        <div className="w-full">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button >
                            {buttonContent}
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className={classNames(popoverStyling, "absolute z-10 mt-2 right-0 min-w-[230px]")}>
                                {({ close }) => (
                                    <div className="flex flex-col space-y-2 overflow-hidden rounded-md border border-gray-200 p-4  bg-white">

                                        {childContent}

                                    </div>
                                )}
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>

        </div>
    )
}

export default PopoverLayout;