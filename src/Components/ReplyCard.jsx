import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { FiGithub, FiTwitter, FiUser } from 'react-icons/fi'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { BiBarChartSquare } from 'react-icons/bi';

const ReplyCard = ({onClick, key,username,reply,socialUsername, twitter, github,instagram,createdAt}) => {

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
      };


  return (
    <div key={key} className='flex-col cursor-pointer py-2 px-3 shadow-xl headfont-regular rounded-xl bg-white flex justify-between transition-all duration-300'>
        
        <div className="func flex gap-2 text-sm lg:gap-1.5 items-center">
            Replied By
            {twitter && (
              <a
                href={`http://x.com/${socialUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FiTwitter />
                {socialUsername}
              </a>
            )}
            {github && (
              <a
                href={`http://github.com/${socialUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FiGithub />
                {socialUsername}
              </a>
            )}
            {instagram && (
              <a
                href={`http://instagram.com/${socialUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FaInstagram />
                {socialUsername}
              </a>
            )}
            {!twitter && !github && !instagram && (
              <a
                href="#"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FiUser />
                {username|| 'noobmaster69'}
              </a>
            )}
            </div>
            <p className='text-base my-1'>{reply}</p>

            <div className="flex gap-1 items-center text-sm">
            <p>Posted {formatDate(createdAt)} </p>
          </div>
    </div>
  )
}

export default ReplyCard