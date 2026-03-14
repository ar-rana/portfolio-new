import { useEffect, useRef } from 'react'
import wavesVideo from '@/assets/video-waves-good.mp4'

interface SideWavesProps {
    left?: boolean;
}

export function SideWaves({ left = false }: SideWavesProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    // 190

    // Attempt to automatically play the unmuted video.
    // If the browser strictly enforces its audio-autoplay block, we catch the Promise rejection
    // and wait for the user to click anywhere on the screen to trigger the play naturally!
    useEffect(() => {
        const attemptPlay = async () => {
            if (videoRef.current) {
                try {
                    await videoRef.current.play()
                } catch (err) {
                    console.log("Browser blocked unmuted auto-play. Waiting for first click to play video.")
                    const playOnClick = () => {
                        videoRef.current?.play()
                        window.removeEventListener('mousedown', playOnClick)
                    }
                    window.addEventListener('mousedown', playOnClick)
                }
            }
        }
        attemptPlay()
    }, [])

    const containerClasses = `fixed bottom-0 translate-y-[30%] md:translate-y-[45%] lg:translate-y-[50%] w-full z-0 pointer-events-none mix-blend-screen transform-gpu ${left ? 'left-0 rotate-[170deg] scale-x-[-1]' : 'right-0 rotate-190'}`

    return (
        <div className={containerClasses}>
            {/* Top/bottom fade gradients (along the screen's Y axis) */}
            <div className="absolute inset-0 bg-linear-to-r from-bg via-transparent to-bg z-10" />

            {/* Inward fade gradient (along the screen's X axis) */}
            <div className={`absolute inset-0 z-10 bg-linear-to-t from-bg to-transparent`} />

            <video
                ref={videoRef}
                loop
                playsInline
                className={`w-full h-full object-cover scale-y-[-1]`}
            >
                <source src={wavesVideo} type="video/mp4" />
            </video>
        </div>
    )
}
