import React from 'react';
import { Disclosure } from '@headlessui/react';
import { HiChevronUp } from 'react-icons/hi';

const DashboardContent = () => {
  return (
    <div className="w-full h-[490px] overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-white pr-2">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded bg-primary px-4 py-2 text-left text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                <span>How to get the most of this extension</span>
                <HiChevronUp
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Suspendisse congue, erat id lacinia consequat, augue odio varius
                nisi, vel venenatis urna sem vel ex. Fusce euismod, ipsum at
                porta mattis, ipsum turpis ultricies felis, a gravida nisi est
                nec ante. Aliquam aliquet congue nibh a tristique. Aenean neque
                felis, semper et massa at, interdum commodo quam. Aliquam dictum
                felis ut lacinia commodo. Quisque vitae erat a purus pulvinar
                posuere. Mauris et nibh facilisis, tristique enim nec, tincidunt
                dolor. Nulla a leo feugiat, laoreet erat sed, rhoncus augue.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded bg-primary px-4 py-2 text-left text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                <span>News</span>
                <HiChevronUp
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Suspendisse congue, erat id lacinia consequat, augue odio varius
                nisi, vel venenatis urna sem vel ex. Fusce euismod, ipsum at
                porta mattis, ipsum turpis ultricies felis, a gravida nisi est
                nec ante. Aliquam aliquet congue nibh a tristique. Aenean neque
                felis, semper et massa at, interdum commodo quam. Aliquam dictum
                felis ut lacinia commodo. Quisque vitae erat a purus pulvinar
                posuere. Mauris et nibh facilisis, tristique enim nec, tincidunt
                dolor. Nulla a leo feugiat, laoreet erat sed, rhoncus augue.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded bg-primary px-4 py-2 text-left text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                <span>Land a job</span>
                <HiChevronUp
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded bg-primary px-4 py-2 text-left text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                <span>Supported Sites</span>
                <HiChevronUp
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                LinkedIn
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default DashboardContent;
