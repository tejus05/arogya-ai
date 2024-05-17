"use client";

import React from "react";

export const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  link,
}: {
  imgSrc: string,
  imgAlt: string,
  title: string,
  description: string,
  buttonText: string,
  link: string,
}) => {
  return (
    <div className="w-60 rounded-xl shadow-lg flex flex-col m-2 bg-white">
      { (
        <img src={imgSrc} alt={imgAlt} className="w-full rounded-t-xl" />
      )}
      {title && <h1 className="m-2">{title}</h1>}
      {description && <p className="m-2">{description}</p>}
      {buttonText && link && (
        <a
          href={link}
          className="text-center w-11/12 rounded-md py-2 bg-blue-700 text-white no-underline m-2"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
};
