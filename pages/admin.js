import Head from 'next/head';
import { EllipsisHorizontalIcon, PlusSmallIcon, } from '@heroicons/react/20/solid'
import PopoverLayout from '../components/PopoverLayout';
import { useState } from 'react';
import { Popover } from '@headlessui/react';
import classNames from '../lib/dynamicStyling';


function Admin() {
    const [answer, setAnswer] = useState('');
    const [tickets, setTickets] = useState([
        {
            "id": 1,
            "sub": "Create ",
            "desc": "Please note that we aim to process all ticket requests within 24 hours of receipt. Our team of experts will carefully review your request and work diligently to provide you with a resolution as quickly as possible.",
            "answer": "",
            "status": 'Pending',
            "userName": "ResmanSys",
            "date": "30.04.2023"
        },
        {
            "id": 2,
            "sub": "New",
            "desc": "Please note that we aim to process all ticket requests within 24 hours of receipt. Our team of experts will carefully review your request and work diligently to provide you with a resolution as quickly as possible.",
            "answer": "",
            "status": 'Pending',
            "userName": "ResmanSys",
            "date": "30.04.2023"
        }
    ]);


    return (
        <>
            <Head>
                <title>ResmanSys: Stats</title>
            </Head>
            <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-1 items-center gap-x-6">
                        <p className='text-xl font-bold'>ADMIN</p>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-x-8">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your profile</span>
                            <img
                                className="h-8 w-8 rounded-full bg-gray-800"
                                src="https://media.licdn.com/dms/image/C4D03AQHCE33uZsO9IA/profile-displayphoto-shrink_800_800/0/1653918289596?e=2147483647&v=beta&t=Swr787xUt5n2XO0oBveCFp2n0ZEwtD7GMCLaA7PTGGo"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
            </header>

            <main className='mt-20'>
                <div className='flex flex-col space-y-2'>
                    {
                        tickets.length > 0 ?
                            tickets.map((ticket, index) => (
                                <div key={index} className='relative group grid grid-cols-12 p-2 border rounded-md bg-gray-50 cursor-pointer'>
                                    <div className='col-span-2 text-xs font-semibold self-center'>{ticket.date}</div>
                                    <div className='col-span-2 text-xs font-medium place-self-center'>{ticket.sub}</div>
                                    <div className='col-span-4 text-xs font-medium self-center'>{ticket.desc}</div>
                                    <div className='col-span-2 text-xs font-medium place-self-center'>Alican Erden</div>
                                    <span className={classNames(ticket.status == "Pending" ? 'text-yellow-800 bg-yellow-100' : 'text-green-800 bg-green-100', "animate-bounce inline-flex absolute -top-1 right-2 items-center rounded-md px-2 py-1 text-xs font-medium")}>
                                        {ticket.status}
                                    </span>

                                    {ticket.status !== 'Answered' &&
                                        <div className='col-span-2 place-self-center'>
                                            <PopoverLayout
                                                buttonContent={
                                                    <button className='p-2 text-orange-600 border rounded-md border-orange-500 bg-orange-50 hover:bg-orange-500 hover:text-orange-50 text-xs font-medium'>Answer</button>
                                                }
                                                childContent={
                                                    <div className='flex flex-col space-y-2'>
                                                        <textarea
                                                            id="about"
                                                            name="about"
                                                            rows={3}
                                                            value={answer}
                                                            onChange={(e) => setAnswer(e.target.value)}
                                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                let newTickets = [...tickets];
                                                                newTickets[index].answer = answer;
                                                                newTickets[index].status = 'Answered';
                                                                setTickets(newTickets);
                                                                setAnswer('')
                                                            }}
                                                            className='p-2 text-orange-600 border rounded-md border-orange-500 bg-orange-50 hover:bg-orange-500 hover:text-orange-50 text-xs font-medium'>SUBMIT</button>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    }


                                    {ticket.status === 'Answered' &&
                                        <p className='text-[10px] text-gray-600 place-self-center'>{ticket.answer}</p>
                                    }


                                </div>
                            ))
                            :
                            <p>No Tickets</p>
                    }
                </div>



            </main>
        </>
    )
}

export default Admin