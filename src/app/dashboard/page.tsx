"use client";

import Link from 'next/link';
import React from 'react'

const cardMap = [
  {
    title: "Community",
    link: "community",
    caption:
      "const Card = ({ title, link, caption }: { title:string, link:string, caption:string}) => {",
  },
  {
    title: "Community",
    link: "community",
    caption: "",
  },
  {
    title: "Community",
    link: "community",
    caption: "",
  },
];

const Card = ({ title, link, caption }: { title:string, link:string, caption:string}) => {
  return (
    <Link href={link} className="border border-black h-[200px] w-[300px] shadow-md">
      <div className="text-[24px]">
        {title}
      </div>
      <div className='text-[16px]'>

      </div>
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className='flex justify-center items-center'>
      {
        cardMap.map(card => (
            <Card
              title={card.title}
              link={card.link}
              caption={card.caption}
              key={card.link}
            />
        ))
      }
    </div>
  )
}

export default Dashboard;