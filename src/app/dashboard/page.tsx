"use client";

import { Card } from '@/components/Card';
import Link from 'next/link';
import React from 'react'

const cardMap = [
  {
    title: "Yoga Guru",
    link: "",
    buttonText: "Explore",
    description:
      "Start analysing your yoga poses with our advanced AI-powered algorithms. ",
    imageAlt: "",
    imageSrc:
      "https://images.shiksha.com/mediadata/images/articles/1689079450php3qZVMP.jpeg",
  },
  {
    title: "Community",
    link: "community",
    buttonText: "Explore",
    description: "Explore the vibrant community of health freaks",
    imageAlt: "",
    imageSrc:
      "https://inspireyoga.com/wp-content/uploads/2021/02/InspireYogaGV-032019_PRT-25-scaled.jpg",
  },
  {
    title: "Arogya Saathi",
    link: "",
    buttonText: "Explore",
    description: "",
    imageAlt: "",
    imageSrc:
      "https://www.priviahealth.com/wp-content/uploads/2019/09/03_20_17_Why-the-Doctor-Patient-Relationship-is-Important-e1530037975292-1200x800.jpg",
  },
  {
    title: "Progress Tracker",
    link: "progress-tracker",
    buttonText: "Explore",
    description: "",
    imageAlt: "",
    imageSrc: "",
  },
  {
    title: "MentCare",
    link: "",
    buttonText: "Explore",
    description: "",
    imageAlt: "",
    imageSrc:
      "https://assets-global.website-files.com/61cb94e5fee3d491ca9aa59c/6494b0deaae5793861ffecf6_61cb94e5fee3d458719aa9f8_first-therapy-appointment.png",
  },
];

const Dashboard = () => {
  return (
    <div className='flex justify-center items-center'>
      {
        cardMap.map(card => (
            <Card
              title={card.title}
              buttonText={card.buttonText}
              description={card.description}
              imgAlt=""
              imgSrc={card.imageSrc}
              link={card.link}
              key={card.link}
            />
        ))
      }
    </div>
  )
}

export default Dashboard;