import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
 
const InterviewCard = ({
  title,
  description,
  imageUrl,
  buttonText = 'View Questions',
  viewMoreLink
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{description}</p>
        <div className="mt-auto">
          <Link
            href={viewMoreLink}
            className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default InterviewCard;
 
 