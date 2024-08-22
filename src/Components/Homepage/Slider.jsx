import { Box } from '@chakra-ui/react';
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SingleImage from './SingleImage';

export default function HomePageCarosel({ images, isleft, links, toggle }) {

    let [cindex, setCindex] = useState(0);
    let [isup, setIsup] = useState(false);
    let run = false;

    const touchStartRef = useRef(null);
    const touchEndRef = useRef(null);

    const handleNext = () => {
        if (run) return;
        run = true;
        setIsup(true);
        setTimeout(() => {
            setCindex(cindex >= images.length - 1 ? 0 : cindex + 1);
            run = false;
        }, 1300);
    };

    const handlePrev = () => {
        if (run) return;
        run = true;
        setIsup(false);
        setTimeout(() => {
            setCindex(cindex < 1 ? images.length - 1 : cindex - 1);
            run = false;
        }, 1300);
    };

    const handleTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        touchEndRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        if (!touchStartRef.current || !touchEndRef.current) return;
        const distance = touchStartRef.current - touchEndRef.current;
        const isSwipeUp = distance > 0;

        if (Math.abs(distance) > 50) {
            if (isSwipeUp) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        touchStartRef.current = null;
        touchEndRef.current = null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: isleft ? "-100vh" : "100px", scaleX: 0.5 }}
            animate={{ opacity: 1, x: 0, scaleX: 1 }}
            transition={{ type: "tween", duration: 1 }}
        >
            <Box
                w="100%"
                h="100vh"
                overflowY="hidden"
                overflow="hidden"
                objectFit="contain"
                onWheel={(e) => { e.deltaY > 0 ? handleNext() : handlePrev(); }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {images.slice(cindex, cindex + 1).map((el, index) => (
                    <SingleImage
                        key={index}
                        el={el}
                        isup={isup}
                        cindex={cindex}
                        images={images}
                        toggle={toggle}
                        links={links}
                    />
                ))}
            </Box>
        </motion.div>
    );
}
