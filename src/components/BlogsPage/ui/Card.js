'use client';

import React from 'react';
import Link from 'next/link';

const Card = ({
  // Content
  children,
  title,
  description,
  buttonText = 'View More',
  author,
  
  // Media
  image,
  icon: Icon,
  iconColor = 'bg-blue-500',
  onImageError,
  
  // Links & Actions
  href,
  onClick,
  viewMoreLink,
  
  // Styling
  className = '',
  contentClassName = '',
  imageClassName = 'h-[45%]', // Slightly reduced image height for better content balance
  buttonClassName = 'inline-flex items-center justify-center w-auto px-6 py-2.5 mx-auto text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-[1.03] transform-gpu group/button relative overflow-hidden after:content-[""] after:absolute after:w-0 after:h-0 after:bg-white/20 after:rounded-full after:translate-x-[--x] after:translate-y-[--y] after:scale-0 hover:after:scale-100 after:transition-all after:duration-500 after:opacity-0 hover:after:opacity-100 hover:after:w-[300px] hover:after:h-[300px] after:pointer-events-none',
  
  // Interactive
  isHoverable = true,
  isClickable = false,
  
  // Additional props
  ...props
}) => {
  const cardClasses = [
    'bg-white rounded-xl shadow-lg overflow-hidden',
    'flex flex-col h-[28rem]',
    'transform transition-all duration-500 ease-in-out',
    'border border-gray-200/70',
    'hover:shadow-xl hover:-translate-y-1 hover:border-blue-200/80',
    isClickable && 'cursor-pointer',
    'group/card',
    'hover:ring-1 hover:ring-blue-100',
    className
  ].filter(Boolean).join(' ');

  const renderImage = () => (
    <div className={`relative ${imageClassName} bg-gray-100 overflow-hidden group-hover/card:opacity-95 transition-all duration-500`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10" />
      {image ? (
        typeof image === 'string' ? (
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-full object-cover transition-all duration-700 group-hover/card:scale-105"
            onError={(e) => {
              if (onImageError) {
                onImageError(e);
              } else {
                // Default behavior if no onImageError handler is provided
                e.target.onerror = null;
                e.target.src = '/placeholder-blog.jpg';
              }
            }}
          />
        ) : (
          image
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No Image</p>
          </div>
        </div>
      )}
      {Icon && (
        <div className="absolute top-4 right-4 text-white opacity-80">
          <div className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    const content = (
      <div className="flex flex-col h-full">
        <div className="p-6 flex-1">
          {title && (
            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover/card:text-blue-600 transition-colors duration-300 group-hover/card:translate-x-1">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {typeof description === 'string' 
                ? description.length > 150 
                  ? `${description.substring(0, 147)}...` 
                  : description
                : description}
            </p>
          )}
          
          {author && (
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>By </span>
              <span className="font-medium text-blue-600 ml-1">{author}</span>
            </div>
          )}
          {children}
          
          {/* Always show Read More button */}
          <div className="mt-auto pt-4 border-t border-gray-200/70 group-hover/card:border-blue-200 transition-all duration-300 group-hover/card:border-t-2">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />
            <Link 
              href={href || viewMoreLink || '#'} 
              className={`${buttonClassName} relative overflow-hidden`}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--x', `${x}px`);
                e.currentTarget.style.setProperty('--y', `${y}px`);
              }}
              onClick={(e) => {
                // Stop event propagation to prevent card click when button is clicked
                e.stopPropagation();
              }}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    );

    return content;
  };

  // Handle clickable cards
  if (href) {
    return (
      <div 
        onClick={() => window.location.href = href}
        className={`${cardClasses} cursor-pointer`}
        {...props}
      >
        {renderImage()}
        <div className="flex-1 flex flex-col">
          {renderContent()}
        </div>
      </div>
    );
  }
  
  // Non-clickable card content
  const content = (
    <div className="flex flex-col h-full">
      {renderImage()}
      {renderContent()}
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${cardClasses} text-left`} {...props}>
        {content}
      </button>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {content}
    </div>
  );
};

export default Card;
