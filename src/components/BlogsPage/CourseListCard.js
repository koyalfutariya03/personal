'use client';
import Link from 'next/link';

export default function CourseCard({ 
  icon: Icon, 
  title, 
  iconColor = "text-purple-400",
  href = `#`,
  onClick,
  className = ""
}) {
  const content = (
    <div className={`bg-white rounded-2xl p-3 w-full flex items-center space-x-4 hover:scale-105 hover:shadow-xl transition-transform duration-200 cursor-pointer ${className}`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
      <span className="text-gray-800 font-medium text-lg">{title}</span>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full max-w-xs text-left">
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className="w-full max-w-xs">
      {content}
    </Link>
  );
}

// This component can be used like this:
// <CourseCard 
//   icon={Settings} 
//   title="Course Title"
//   iconColor="text-blue-900"
//   href="/courses/course-slug"
// />
