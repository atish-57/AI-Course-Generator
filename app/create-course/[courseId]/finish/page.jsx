"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FinishScreen = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    params && GetCourse();
    setIsClient(true);
  }, [params, user]);
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    // console.log(result);
    setCourse(result[0]);
  };
  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats! your course is now Ready..
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <Link href={'/course/'+course?.courseId+'/start'}>
          <Button className="w-full mt-5 cursor-pointer">Start</Button>
          </Link>
      <h3 className="mt-3  mb-2">Course Url:</h3>
      <h2 className="flex items-center justify-between text-center text-gray-400 border p-2 rounded-md">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
        <span className="relative flex items-center">
          <HiOutlineClipboardDocumentCheck
            onClick={async () => {
              await navigator.clipboard.writeText(
                process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course?.courseId
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className={`text-2xl cursor-pointer text-primary transition-colors duration-200 ${copied ? 'text-green-500' : ''}`}
          />
          {copied && (
            <span className="absolute left-full ml-2 text-green-600 text-sm bg-white border border-green-300 rounded px-2 py-1 shadow z-10">Copied!</span>
          )}
        </span>
        {/* Share URL Icon */}
        {isClient && navigator.share && (
          <HiOutlineShare
            onClick={() => {
              navigator
                .share({
                  title: "Check out this course!",
                  url:
                    process.env.NEXT_PUBLIC_HOST_NAME +
                    "/course/" +
                    course?.courseId,
                })
                .then(() => console.log("Successfully shared"))
                .catch((error) => console.log("Error sharing", error));
            }}
            className="text-2xl cursor-pointer text-primary"
            title="Share URL"
          />
        )}
      </h2>
    </div>
  );
};

export default FinishScreen;
