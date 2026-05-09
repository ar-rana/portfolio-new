import { useEffect, useRef, useState } from 'react'
import wavesVideo from '@/assets/video-waves-good.mp4'

interface SideWavesProps {
    left?: boolean;
}

export function SideWaves({ left = false }: SideWavesProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isMuted, setIsMuted] = useState(true)

    // The video starts muted so it can auto-play immediately on load.
    // On the first user interaction, we unmute the video.
    useEffect(() => {
        const unmuteOnClick = () => {
            setIsMuted(false)
            // Ensure the video is playing in case autoPlay somehow failed
            videoRef.current?.play().catch(() => { })
            window.removeEventListener('mousedown', unmuteOnClick)
            window.removeEventListener('keydown', unmuteOnClick)
        }

        window.addEventListener('mousedown', unmuteOnClick)
        window.addEventListener('keydown', unmuteOnClick)

        return () => {
            window.removeEventListener('mousedown', unmuteOnClick)
            window.removeEventListener('keydown', unmuteOnClick)
        }
    }, [])

    const containerClasses = `fixed bottom-0 translate-y-[30%] md:translate-y-[45%] lg:translate-y-[50%] w-full z-20 pointer-events-none mix-blend-screen transform-gpu ${left ? 'left-0 rotate-[170deg] scale-x-[-1]' : 'right-0 rotate-190'}`

    return (
        <div className={containerClasses}>
            {/* Top/bottom fade gradients (along the screen's Y axis) */}
            <div className="absolute inset-0 bg-linear-to-r from-bg via-transparent to-bg z-10" />

            {/* Inward fade gradient (along the screen's X axis) */}
            <div className={`absolute inset-0 z-10 bg-linear-to-t from-bg to-transparent`} />

            <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className={`w-full h-full object-cover scale-y-[-1]`}
            >
                <source src={wavesVideo} type="video/mp4" />
            </video>
        </div>
    )
}

