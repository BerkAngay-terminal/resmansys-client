import { Fragment, useState } from 'react'
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import {
  EllipsisHorizontalIcon, PlusSmallIcon,
} from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from '../lib/dynamicStyling'
import Head from 'next/head'
import { toast } from 'react-toastify'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Countdown from 'react-countdown';
import moment from 'moment/moment'
import PopoverLayout from '../components/PopoverLayout'
import { removeCookies } from 'cookies-next';
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]
const secondaryNavigation = [
  { name: 'Last 30 days', href: '#', current: false },
  { name: 'All-time', href: '#', current: false },
]
const stats = [
  { name: 'Overdue invoices', value: '₺3.500.00 TL' },
  { name: 'Outstanding invoices', value: '₺3,500.00 TL' },
  { name: 'Paid invoices', value: '₺12,100.00 TL' },
]
const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}
const days = [
  {
    date: 'Last 6 Months',
    dateTime: '2023-03-22',
    transactions: [
      {
        id: 1,
        invoiceNumber: '00004',
        href: '#',
        amount: '₺3,500.00 TL',
        tax: '₺500.00',
        status: 'Outstanding',
        client: 'ResmanSys',
        description: 'Monthly Billing | 01.04.2023',
      },
      {
        id: 2,
        invoiceNumber: '00003',
        href: '#',
        amount: '₺3,250.00 TL',
        tax: '₺500.00',
        status: 'Overdue',
        client: 'ResmanSys',
        description: 'Monthly Billing | 01.03.2023',
      },
      {
        id: 3,
        invoiceNumber: '00002',
        href: '#',
        amount: '₺3,250.00 TL',
        tax: '₺130.00',
        status: 'Paid',
        client: 'ResmanSys',
        description: 'Monthly Billing | 01.02.2023',
      },
      {
        id: 4,
        invoiceNumber: '00001',
        href: '#',
        amount: '₺3,250.00 TL',
        tax: '₺130.00',
        status: 'Paid',
        client: 'ResmanSys',
        description: 'Monthly Billing | 01.01.2023',
      },
      {
        id: 5,
        invoiceNumber: '00012',
        href: '#',
        amount: '₺2.800.00 TL',
        tax: '₺130.00',
        status: 'Paid',
        client: 'ResmanSys',
        description: 'Monthly Billing | 01.12.2022',
      },
      {
        id: 6,
        invoiceNumber: '00011',
        href: '#',
        amount: '₺2.800.00 TL',
        tax: '₺130.00',
        status: 'Paid',
        client: 'ResmanSys',
        description: 'Monthly Billing | 01.11.2022',
      },
    ],
  }
]

export default function Home() {
  const router = useRouter();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceModalState, setInvoiceModalState] = useState(false);
  const [ticketModaLState, setTicketModalState] = useState(false);
  const [reservationModaLState, setReservationModalState] = useState(false);
  const defAct = [
    {
      id: 1,
      name: 'Tennis Court',
      isSelected: false,
      imageUrl: 'data:image/png;base64,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',
      reservations: []
    },
    {
      id: 2,
      name: 'Basketball Court',
      isSelected: false,
      imageUrl: 'data:image/png;base64,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',
      reservations: []
    },
    {
      id: 3,
      name: 'Fitness Center',
      isSelected: false,
      imageUrl: 'data:image/png;base64,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',
      reservations: []
    }
  ]
  const [activities, setActivities] = useState(defAct);
  const [tickets, setTickets] = useState([]);

  function TicketModal() {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit() {
      // onClick save subject and description  object with userName on tickets array use state 
      setTickets([...tickets, { sub: subject, desc: description, userName: 'ResmanSys', date: new Date().toLocaleDateString() }])
      setTicketModalState(false)
    }

    return (
      <Transition.Root show={ticketModaLState} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setTicketModalState}>

          {/* bg overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed flex inset-0 z-10 overflow-y-auto p-2 sm:items-center sm:justify-center">
            <div className='h-full inset-0 rounded-md bg-gray-50 shadow-lg p-4 space-y-2 sm:w-2/4 sm:h-3/5 lg:w-3/5 xl:w-2/5 sm:self-center overflow-y-auto'>

              {/* Close Button */}
              <div className='w-full flex justify-end'>
                <button onClick={() => {
                  setTicketModalState(false);
                }}>
                  <XMarkIcon className='h-7 w-7 text-gray-600' />
                </button>
              </div>

              {/* Title */}
              <div className='mb-3 border-b border-dash pb-4'>
                <h3 className='font-medium text-gray-700 text-lg'>Create New Ticket</h3>
                <p className='text-xs text-gray-500'>Please note that we aim to process all ticket requests within 24 hours of receipt. Our team of experts will carefully review your request and work diligently to provide you with a resolution as quickly as possible.</p>
              </div>

              <div className='grid grid-cols-12 grid-rows-6 gap-2 h-96'>

                {/* Subject */}
                <div className='col-span-6 w-full h-full'>
                  <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                    Subject
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 sm:max-w-md">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                {/* Desc */}
                <div className=' row-start-2 mt-4 col-span-12 w-full h-full'>
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your issue.</p>

                </div>

                {/* Submit Button */}
                <div onClick={() => {
                  toast.promise(handleSubmit(),
                    {
                      pending: 'Ticket sending... 🤔',
                      success: 'Ticket sent! 🥳',
                      error: 'Ticket failed to send 😢'
                    });
                }} className='row-start-5 col-span-12 selection:w-full h-full'>
                  <button className='w-full p-3 bg-orange-50 text-orange-600 border border-orange-500 rounded-md hover:bg-orange-600 hover:text-orange-50 font-medium'>SUBMIT</button>
                </div>
              </div>


            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  function ViewDetailModal() {

    return (
      <Transition.Root show={invoiceModalState} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setInvoiceModalState}>

          {/* bg overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed flex inset-0 z-10 overflow-y-auto p-2 sm:items-center sm:justify-center">
            <div className='h-full inset-0 rounded-md bg-white shadow-lg p-4 space-y-2 sm:w-2/4 sm:h-3/5 lg:w-3/5 xl:w-2/5 sm:self-center overflow-y-auto'>

              {/* Close Button */}
              <div className='w-full flex justify-end'>
                <button onClick={() => {
                  setInvoiceModalState(false);
                }}>
                  <XMarkIcon className='h-7 w-7 text-gray-600' />
                </button>
              </div>

              {/* Title */}


              {selectedInvoice != null &&
                <>
                  <div className='mb-3 border-b border-dash pb-4'>
                    <h3 className='font-medium text-gray-700 text-lg'>Invoice: {selectedInvoice.invoiceNumber}</h3>
                  </div>

                  <div className='bg-white rounded-md shadow p-5'>

                    {/* upper infos */}
                    <div className='flex items-center justify-between space-x-6 border-b pb-5'>
                      {/* company infos */}
                      <div className='flex flex-col items-start justify-start'>
                        <p className='text-xs text-gray-700 uppercase'>ResmanSys AŞ.</p>
                        <p className='text-xs text-gray-700 uppercase'>İzmir/Bornova</p>
                        <p className='text-xs text-gray-700'>info@resmansys.com</p>
                        <p className='text-xs text-gray-700 font-semibold'>0850 850 31 69</p>
                        <div className='h-3'></div>
                      </div>

                      {/* logo */}
                      <div className='flex flex-col items-center justify-center'>
                        <img className='h-32' src="https://seeklogo.com/images/G/gelir-idaresi-baskanligi-yeni-logo-FCA1A618F0-seeklogo.com.png" />
                        <p className='text-lg text-gray-700 font-semibold'>e-Arşiv</p>
                      </div>

                    </div>

                    {/* middle infos */}
                    <div className='flex justify-between border-b py-5'>
                      {/* customer infos */}
                      <div className='flex flex-col items-start justify-start w-72'>
                        <p className='text-xs text-gray-700 font-bold uppercase'>Sayın</p>
                        <p className='text-xs text-gray-700 '>Alican Erden</p>
                        <p className='text-xs text-gray-700 '>İzmir / Bornova </p>
                        <p className='text-xs text-gray-700'>Tel: 5301109636</p>
                        <p className='text-xs text-gray-700 font-semibold'>TC: 11930632471</p>
                        <div className='h-3'></div>
                      </div>

                    </div>

                    {/* lower infos */}
                    <div className='flex flex-col space-y-4  py-5'>

                      {/* line table */}
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Sıra No
                            </th>
                            <th scope="col" className="px-1 py-3.5 text-left text-xs font-semibold text-gray-900">
                              Stok Kodu
                            </th>
                            <th scope="col" className="px-1 py-3.5 text-left text-xs font-semibold text-gray-900">
                              Miktar
                            </th>
                            <th scope="col" className="px-1 py-3.5 text-left text-xs font-semibold text-gray-900">
                              Birim Fiyatı
                            </th>
                            <th scope="col" className="px-1 py-3.5 text-left text-xs font-semibold text-gray-900">
                              KDV Tutarı
                            </th>
                            <th scope="col" className="px-1 py-3.5 text-left text-xs font-semibold text-gray-900">
                              Döviz Tutar
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              1
                            </td>
                            <td className=" px-1 py-4 text-xs text-gray-500">RES1</td>
                            <td className="whitespace-nowrap px-1 py-4 text-xs text-gray-500">1</td>
                            <td className="whitespace-nowrap px-1 py-4 text-xs text-gray-500">{selectedInvoice.amount}</td>
                            <td className="whitespace-nowrap px-1 py-4 text-xs text-gray-500">{selectedInvoice.tax}</td>
                            <td className="whitespace-nowrap px-1 py-4 text-xs text-gray-500">{Math.floor(selectedInvoice.amount / 19.4)}$</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>

                  </div>
                </>
              }


            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  function ReservationModal() {
    const [value, onChange] = useState(new Date());
    return (
      <Transition.Root show={reservationModaLState} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setReservationModalState}>

          {/* bg overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed flex inset-0 z-10 overflow-y-auto p-2 sm:items-center sm:justify-center">
            <div className='h-full inset-0 rounded-md bg-white shadow-lg p-4 space-y-2 sm:w-80 sm:h-2/5  sm:self-center overflow-y-auto'>

              {/* Close Button */}
              <div className='w-full flex justify-end'>
                <button onClick={() => {
                  const updatedActivities = activities.map((activity) => {
                    if (activity.isSelected) {
                      return { ...activity, isSelected: false };
                    } else {
                      return activity;
                    }
                  });
                  setActivities(updatedActivities);
                  setReservationModalState(false);
                }}>
                  <XMarkIcon className='h-7 w-7 text-gray-600' />
                </button>
              </div>

              <div className='mb-3 border-b border-dash pb-4'>
                <h3 className='font-medium text-gray-700 text-lg'>{activities.filter(act => act.isSelected).map(act => act.name)}</h3>
                <p className='text-xs text-gray-500'>Please be sure to select the correct date and time for your reservation. Our system will only show availability for the date and time you select.</p>
              </div>

              <div className='flex flex-col space-y-4'>
                <DateTimePicker onChange={onChange} value={value} />
                <button onClick={() => {
                  const updatedActivities = activities.map((activity) => {
                    if (activity.isSelected) {
                      return { ...activity, isSelected: false, reservations: [...activity.reservations, { date: value }] };
                    } else {
                      return activity;
                    }
                  });
                  setActivities(updatedActivities);
                  setReservationModalState(false);
                }} className='w-full p-2 font-medium rounded-md border bg-orange-50 text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-orange-50'>SUBMIT</button>
              </div>


            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  const Completionist = () => <span className='text-xs text-green-700'>You are good to go!</span>;


  function removeTokenCookie() {
    removeCookies('token');
    removeCookies('uid');
    router.push('/signIn')
  }

  console.log('Tickets', tickets);

  return (
    <>
      <TicketModal />
      <ViewDetailModal />
      <ReservationModal />
      <Head>
        <title>ResmanSys: Stats</title>
      </Head>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-8">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your profile</span>
              <PopoverLayout
                buttonContent={
                  <img
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src="https://media.licdn.com/dms/image/C4D03AQHCE33uZsO9IA/profile-displayphoto-shrink_800_800/0/1653918289596?e=2147483647&v=beta&t=Swr787xUt5n2XO0oBveCFp2n0ZEwtD7GMCLaA7PTGGo"
                    alt=""
                  />
                }
                childContent={
                  <button onClick={() => removeTokenCookie()} className='p-2 border rounded-md text-orange-500 bg-orange-50 border-orange-500 text-xs'>Logout</button>
                }
              />

            </a>
          </div>
        </div>
      </header>

      <main>
        <div className="relative isolate overflow-hidden pt-16">
          {/* Secondary navigation */}
          <header className="pb-4 pt-6 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">ResManSys</h1>

              <button
                onClick={() => {
                  setTicketModalState(true);
                }}
                className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                New Ticket
              </button>
            </div>
          </header>

          {/* Stats */}
          <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
              {stats.map((stat, statIdx) => (
                <div
                  key={stat.name}
                  className={classNames(
                    statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                    'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8'
                  )}
                >
                  <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                  <dd
                    className={classNames(
                      stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                      'text-xs font-medium'
                    )}
                  >
                    {stat.change}
                  </dd>
                  <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
            aria-hidden="true"
          >
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
              style={{
                clipPath:
                  'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
              }}
            />
          </div>
        </div>

        <div className="space-y-16 py-16 xl:space-y-20">
          {/* Recent activity table */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                Recent Payments
              </h2>
            </div>
            <div className="mt-6 overflow-hidden border-t border-gray-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <thead className="sr-only">
                      <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day) => (
                        <Fragment key={day.dateTime}>
                          <tr className="text-sm leading-6 text-gray-900">
                            <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                              <time dateTime={day.dateTime}>{day.date}</time>
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                            </th>
                          </tr>
                          {day.transactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="relative py-5 pr-6">
                                <div className="flex gap-x-6">
                                  <div className="flex-auto">
                                    <div className="flex items-start gap-x-3">
                                      <div className="text-sm font-medium leading-6 text-gray-900">
                                        {transaction.amount}
                                      </div>
                                      <div
                                        className={classNames(
                                          statuses[transaction.status],
                                          'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                        )}
                                      >
                                        {transaction.status}
                                      </div>
                                    </div>
                                    {transaction.tax ? (
                                      <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.tax} tax</div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden py-5 pr-6 sm:table-cell">
                                <div className="text-sm leading-6 text-gray-900">{transaction.client}</div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.description}</div>
                              </td>
                              <td className="py-5 text-right">
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => {
                                      setSelectedInvoice(transaction)
                                      setInvoiceModalState(true)
                                    }}
                                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                  >
                                    View<span className="hidden sm:inline"> detail</span>
                                    <span className="sr-only">
                                      , invoice #{transaction.invoiceNumber}, {transaction.client}
                                    </span>
                                  </button>
                                </div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  Invoice <span className="text-gray-900">#{transaction.invoiceNumber}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Recent client list*/}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Activity areas to reserve</h2>
              </div>
              <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                {activities.map((act) => (
                  <li key={act.id} className="rounded-xl border border-gray-200">
                    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 overflow-visible">
                      <img
                        src={act.imageUrl}
                        alt={act.name}
                        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                      />
                      <div className="text-sm font-medium leading-6 text-gray-900">{act.name}</div>
                      <Menu as="div" className="relative ml-auto">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Open options</span>
                          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    const updatedActivities = activities.map((activity) => {
                                      if (activity.id === act.id) {
                                        return { ...activity, isSelected: true };
                                      } else {
                                        return activity;
                                      }
                                    });
                                    setActivities(updatedActivities);
                                    setReservationModalState(true)
                                  }}
                                  className={classNames(
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                  )}
                                >
                                  Make Reservation
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    {act.reservations.length > 0 &&
                      <div className='divide-y divide-dashed'>
                        {act.reservations.map((reservation, index) => (
                          <div key={index} className='flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer'>
                            <p className='text-xs font-medium text-gray-500'>{index + 1}</p>
                            <p className='text-xs font-semibold text-gray-600'>{moment(reservation.date).format('DD/MM/YYYY | HH:mm')}</p>
                            <Countdown className='text-xs font-semibold text-gray-600' date={reservation.date}>
                              <Completionist />
                            </Countdown>
                          </div>
                        ))}
                      </div>
                    }
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col space-y-2 mt-14'>
              <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                Tickets that you created.
              </h2>

              <div className='flex flex-col space-y-2'>
                {
                  tickets.length > 0 ?
                    tickets.map((ticket, index) => (
                      <div key={index} className='relative group grid grid-cols-12 p-2 border rounded-md bg-gray-50 cursor-pointer'>
                        <div className='col-span-3 text-xs font-semibold self-center'>{ticket.date}</div>
                        <div className='col-span-3 text-xs font-medium self-center'>{ticket.sub}</div>
                        <div className='col-span-6 text-xs font-medium self-center'>{ticket.desc}</div>
                        <span className="hidden group-hover:inline-flex absolute top-2 right-2 items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                          Pending
                        </span>
                      </div>
                    ))
                    :
                    <p>No Tickets</p>
                }
              </div>
            </div>
          </div>

        </div>

      </main>
    </>
  )
}
