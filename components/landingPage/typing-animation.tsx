'use client'

import { TypeAnimation } from 'react-type-animation';

export default function Typinganimation(){
    return (
        <TypeAnimation className='text-4xl text-green-900 font-extrabold inline-block py-5'
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Nutrition that farmers trust. . .',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Built for animals. Backed by science. . .',
                1000,
            ]}
            wrapper="span"
            speed={30}
            repeat={Infinity}
        />
    );
};