import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader';

function CourseViewLayout({children}) {
  return (
    <div>
      <DashboardHeader />
      <div className="px-4 md:px-8 lg:px-12 mt-10">{children}</div>
    </div>
  );
}

export default CourseViewLayout 