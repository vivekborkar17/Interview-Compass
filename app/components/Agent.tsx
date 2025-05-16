import React from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils"
enum CallStatus{
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

const Agent = ({userName}: AgentProps) => {
    const isSpeaking = true;
    const callStatus = CallStatus.FINISHED;
    const messages = [
        'Whats your name?',
        'My name is jhon, Nice to meet you!',

    ]
    const lastMessage = messages[messages.length - 1];
  return (
    <>
    <div className='call-view'>
      <div className='card-interviewer'>
        <div className='avatar'>
            <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover' />
            {isSpeaking && <span className='animate-speak'/>}
        </div>
            <h3>AI Interviwer</h3>
      </div>
      <div className='card-border'>
        <div className="card-content">
            <Image src="/user-avatar.png" alt="User Avatar" width={540} height={540} className= 'rounded-full object-cover size-[120px]' />
            <h3>{userName}</h3>
        </div>
      </div>
    </div>
    {messages.length > 0 && (
        <div className="message">
            <div className="transcript-border">
                <div className='transcript'>
                <p key = {lastMessage} className={cn('transition-opacity duration-500 opasit-0','animate-fadeIn opacity-100')}>{lastMessage}</p>
                </div>
            </div>
        </div>
    )}
    <div className="w-full flex justify-center">
        {callStatus !== 'ACTIVE' ? (
        <div button className="relative btn-call">
      <span
        className={cn(
          'absolute animate-ping rounded-full opacity-75',
          callStatus !== 'CONNECTING' && 'hidden'
        )}
      />
      <span>
        {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'CALL' : '. . .'}
      </span>
    </div>
  ) : (
    <button className="btn-disconnect">End</button>
  )}
    </div>

    </>
  )
}

export default Agent
