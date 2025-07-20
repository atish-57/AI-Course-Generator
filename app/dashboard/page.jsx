import React from 'react'
import UserCourseList from './_components/UserCourseList'
import Addcourse from './_components/AddCourse'
const Dashboard = () => {
  return (
    <div>
      <Addcourse/>
      <UserCourseList />
    </div>
  )
}

export default Dashboard