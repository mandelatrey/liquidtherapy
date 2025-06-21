import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useRef} from "react";
import {useMediaQuery} from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef();
    const videoTimelineRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767});

    useGSAP(() => {
            // Register SplitText plugin if not already registered
            gsap.registerPlugin(SplitText);

            const heroSplit = new SplitText('.title', {
                type: 'chars,words'
            });
            const paraSplit = new SplitText('.subtitle', {
                type: 'lines, words'
            })

            heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

            gsap.from(heroSplit.chars, {
                yPercent: 100,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.04
            });

            gsap.from(paraSplit.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.04,
                delay: 1,
                color: 'white'
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            })
                .to('.right-leaf', {
                    y: 200
                }, 0)
                .to('.left-leaf', {
                    y: -200
                }, 0)

            const startValue = isMobile ? 'top 50%' : 'center 60%';
            const endValue = isMobile ? '120% top' : 'bottom top';

            // Store the start and end values for use in onLoadedMetadata
            videoRef.current.startValue = startValue;
            videoRef.current.endValue = endValue;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: 'video',
                    start: startValue,
                    end: endValue,
                    scrub: true,
                    pin: true,

                }
            })

            videoRef.current.onloadedmetadata = () => {
               tl.to(videoRef.current, {
                   currentTime: videoRef.current.duration,
                   scale: 0.9, // Add a slight zoom out effect (scale down to 90%)
                   ease: "none"
               })
            }

        },
        [])

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title tracking-tighter">
                   Medication
                </h1>

                <img src="/images/hero-left-leaf.png"
                     alt="left-leaf"
                     className="left-leaf"/>
                <img src="/images/hero-right-leaf.png"
                     alt="right-leaf"
                     className="right-leaf"/>

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool, crisp and just classic!</p>
                            <p className="subtitle">
                                Sip the liquid spirit <br /> of summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.
                            </p>
                            <a href="#cocktails">
                                View Cocktails
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video absolute inset-0">
                <video 
                    ref={videoRef} 
                    src="/videos/output.mp4"
                    muted 
                    playsInline 
                    preload="auto"
                    //autoPlay
                />
            </div>

        </>
    );
};

export default Hero;