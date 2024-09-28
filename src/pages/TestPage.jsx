import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { IoClose } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { GoGift } from 'react-icons/go';
import { ImFilesEmpty } from 'react-icons/im';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiMenuFill } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineLogout } from 'react-icons/ai';

const NAVIGATION_MENUS = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <RxDashboard size={22} />,
    },

    {
        id: 2,
        title: 'Products',
        icon: <GoGift size={22} />,
    },

    {
        id: 3,
        title: 'Pages',
        icon: <ImFilesEmpty size={22} />,
    },
    {
        id: 4,
        title: 'Settings',
        icon: <IoSettingsOutline size={22} />,
    },
];

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: 'auto',
            transition: {
                duration: 0.5,
            },
        },
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth]);

    return (
        <section className="flex min-h-screen text-white">
            {/* navbar section ******************************** */}
            <aside className="p-5 bg-orange-500">
                <motion.div
                    animate={{
                        width: isSidebarOpen ? '250px' : '60px',
                        transition: {
                            duration: 0.5,
                            type: 'spring',
                            damping: 10,
                        },
                    }}
                    className="relative  h-full"
                >
                    <div className="flex justify-between items-center">
                        {isSidebarOpen && (
                            <>
                                <AnimatePresence>
                                    <motion.p
                                        variants={showAnimation}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="uppercase text-lg font-semibold"
                                    >
                                        React UI
                                    </motion.p>
                                </AnimatePresence>
                            </>
                        )}

                        <div className="py-3 px-4 rounded-md hover:bg-white hover:text-black">
                            {isSidebarOpen ? (
                                <IoClose
                                    size={22}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setIsSidebarOpen((prev) => !prev)
                                    }
                                />
                            ) : (
                                <RiMenuFill
                                    size={22}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setIsSidebarOpen((prev) => !prev)
                                    }
                                />
                            )}
                        </div>
                    </div>

                    {/* sidebar navigation menu **************************************************** */}

                    <nav className="mt-10 ">
                        <ul className="space-y-4">
                            {NAVIGATION_MENUS?.map((menu) => (
                                <li
                                    key={menu.id}
                                    className={classNames(
                                        `relative group flex gap-4 rounded-md py-3 px-4 items-center cursor-pointer transition-all duration-300  hover:bg-white hover:text-black`,
                                        {
                                            'justify-center': !isSidebarOpen,
                                        }
                                    )}
                                >
                                    <div>{menu.icon}</div>
                                    {isSidebarOpen && (
                                        <AnimatePresence>
                                            <motion.p
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                            >
                                                {menu.title}
                                            </motion.p>
                                        </AnimatePresence>
                                    )}

                                    {!isSidebarOpen && (
                                        <p className="absolute left-[150%] top-1/2 transform -translate-y-1/2 whitespace-nowrap bg-orange-500 text-white px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {menu.title}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div
                        className={classNames(
                            `flex  gap-4 rounded-md py-3 px-4 items-center cursor-pointer transition-all duration-300    absolute bottom-0 w-full hover:bg-white hover:text-black`,
                            {
                                'justify-center': !isSidebarOpen,
                            }
                        )}
                    >
                        <AiOutlineLogout size={22} />
                        {isSidebarOpen && (
                            <AnimatePresence>
                                <motion.p
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                >
                                    Logout
                                </motion.p>
                            </AnimatePresence>
                        )}
                    </div>
                </motion.div>
            </aside>

            <div className="text-black flex-1  p-5  dark:bg-background text-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                similique quo minima aliquid beatae dignissimos doloremque odit
                necessitatibus, corporis quam ad rerum? Eveniet ab in tenetur
                officia! Quos, iusto facere.
            </div>
        </section>
    );
}
