import React from 'react'
import {Button} from '../components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '../components/InterviewCard'

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className="flex flex-col gap-6 max-2-lg">
        <h2>Get Interview Ready With AI-Powered Practice and Feedback</h2>
        <p className="text-lg">
          Practice on real life interview questions, get AI-generated feedback, and improve your skills with Interview Compass.
        </p>
        <Button  asChild className='btn-primary max-sm:w-full ' >
          <Link href="/interview">Start An Interview</Link>

        </Button>
      </div>
      <Image src="/robot.png" alt="robot" width={400} height={400} className='max-sm:hidden'/>
    </section>

    <section className="flex flex-col gap-6 mt-8 ">
      <h2>Your Interviews</h2>
      <div className="interviews-section">
      {dummyInterviews.map((interview)=>(
         <InterviewCard{...interview} key={interview.id}/>
      ))}
      </div>
    </section>

    <section className="flex flex-col mt-8">
      <h2>Take a interview</h2>

      <div className="interviews-section">
      {dummyInterviews.map((interview)=>(
         <InterviewCard{...interview}/>
      ))}
      </div>
    </section>
    </>
  )
}

export default page
