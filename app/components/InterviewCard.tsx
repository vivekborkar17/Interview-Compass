import React from 'react'
import dayjs from 'dayjs';
import Image from 'next/image'
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons';



const InterviewCard = ({interviewId,userId,role,type,techstack,createdAt}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalisedType = /mixed/gi.test(type) ? 'Mixed' : type;
  const formatedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

  return (
    <>
    <div className="card-border w-[360] max-sm:w-full min-h-96">
      <div className='card-interview'>
        <div>
            <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                <p className='badge-text'>{normalisedType}</p>
            </div>
            <Image
              src={getRandomInterviewCover()}
              alt="interview cover"
              width={390}
              height={90}
              className="rounded-full object-cover w-[90px] h-[90px]"
              priority // Add priority to ensure the image is preloaded
            />
            <h3 className='mt-5 capitalize'>
                {role} Interview
             </h3>
            <div className="flex flex-row gap-5 mt-3 ">
                <div className="flex flex-row gap-2">
                    <Image src="/calendar.svg" alt="calander" width={22} height = {22}></Image>
                    <p>{formatedDate}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <Image src="/star.svg" alt="star" width={22} height={22}/>
                    <p>{feedback?.totalScore ||'---'}/100</p>

                </div>
            </div>
            <p className='line-clamp-2 mt-5'>
                {feedback?.finalAssessment || "You havent taken this interview yet. Take it to improve your skills."}
            </p>
        </div>
        <div className="flex flex-row justify-between">
            <DisplayTechIcons techStack={techstack}/>
            <Button className='btn-primary'>
            <Link href={feedback 
                 ? `/interview/${interviewId}/feedback` 
                 : `/interview/${interviewId}`
            }>
            {feedback ? 'View Feedback' : 'View Interview'}
            </Link>

            </Button>
        </div>
      </div>
    </div>
    </>
  )
}

export default InterviewCard
