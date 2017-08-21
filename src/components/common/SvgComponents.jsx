import React from 'react'
export const ProgressBar = ( props ) => {
    return (
        <svg {...props} className="ant-progress-circle " viewBox="0 0 100 100">
            <path className="ant-progress-circle-trail" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="#f3f3f3" strokeWidth="6" fillOpacity="0" style={{strokeDasharray: '295.31px, 295.31px', strokeDashoffset: '0px', transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s'}}></path>
        </svg>
    )
}
