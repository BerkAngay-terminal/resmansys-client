import Head from 'next/head';
import { EllipsisHorizontalIcon, PlusSmallIcon, } from '@heroicons/react/20/solid'

function Admin() {

    return (
        <>
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
                            <img
                                className="h-8 w-8 rounded-full bg-gray-800"
                                src="https://media.licdn.com/dms/image/C4D03AQHCE33uZsO9IA/profile-displayphoto-shrink_800_800/0/1653918289596?e=2147483647&v=beta&t=Swr787xUt5n2XO0oBveCFp2n0ZEwtD7GMCLaA7PTGGo"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
            </header>

            <main>




            </main>
        </>
    )
}

export default Admin