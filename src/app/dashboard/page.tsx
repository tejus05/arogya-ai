"use client";

import { Card } from '@/components/Card';
import Link from 'next/link';
import React from 'react'

const cardMap = [
  {
    title: "Yoga Guru",
    link: "",
    buttonText: "Start Practicing",
    description:
      "Improve your yoga poses with our advanced AI-powered algorithms. Perfect your asanas and enhance your flexibility.",
    imageAlt: "",
    imageSrc:
      "https://images.shiksha.com/mediadata/images/articles/1689079450php3qZVMP.jpeg",
  },
  {
    title: "Community",
    link: "community",
    buttonText: "Join Now",
    description:
      "Become a part of our vibrant community of health enthusiasts. Share your journey, learn from others, and stay motivated.",
    imageAlt: "",
    imageSrc:
      "https://inspireyoga.com/wp-content/uploads/2021/02/InspireYogaGV-032019_PRT-25-scaled.jpg",
  },
  {
    title: "Arogya Saathi",
    link: "",
    buttonText: "Get Results",
    description:
      "Get personalized health advice from our Arogya Saathi. Make informed decisions about your health and wellness with our AI-powered solution.",
    imageAlt: "",
    imageSrc:
      "https://www.priviahealth.com/wp-content/uploads/2019/09/03_20_17_Why-the-Doctor-Patient-Relationship-is-Important-e1530037975292-1200x800.jpg",
  },
  {
    title: "Progress Tracker",
    link: "progress-tracker",
    buttonText: "Track Now",
    description:
      "Monitor your health progress with our intuitive tracker. Set goals, track them, and celebrate your achievements.",
    imageAlt: "",
    imageSrc: "",
  },
  {
    title: "MentCare",
    link: "",
    buttonText: "Start Therapy",
    description:
      "Connect with our AI chatbot, MentCare, for instant mental health support. Get insights, tips, and resources tailored to your needs.",
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
              key={card.buttonText}
            />
        ))
      }
    </div>
  )
}

export default Dashboard;