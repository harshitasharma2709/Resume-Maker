import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {

    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
            date: 'April 20, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            date: 'May 10, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            date: 'June 5, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Avery Johnson',
            handle: '@averywrites',
            date: 'May 10, 2025'
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
            
            <div className="flex gap-2">
                <img
                    className="size-11 rounded-full"
                    src={card.image}
                    alt="User"
                />

                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p>{card.name}</p>

                        <svg
                            className="mt-0.5 fill-green-500"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Zm2.78-7.72a.75.75 0 0 0-1.06-1.06L5.25 5.69 4.28 4.72a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06 0l3-3Z"
                        />
                        </svg>
                    </div>

                    <span className="text-xs text-slate-500">
                        {card.handle}
                    </span>
                </div>
            </div>

            <p className="text-sm py-4 text-gray-800">
                I landed my dream job interview within a week of using this builder. The AI suggestions made my resume stand out!
            </p>

            <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Posted on X</span>

                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <>
            <div
                id='testimonials'
                className='flex flex-col items-center my-10 scroll-mt-12 overflow-hidden'
            >

                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-4 py-1.5">
                    <BookUserIcon className="size-4 stroke-green-600" />

                    <span>Testimonials</span>
                </div>

                <Title
                    title="Don't just take our words"
                    description="Hear what our satisfied customers have to say about their experience."
                />

                <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">

                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

                    <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

                </div>

                <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">

                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

                </div>

            </div>

            <style>{`
                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }

                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>
        </>
    )
}

export default Testimonial
