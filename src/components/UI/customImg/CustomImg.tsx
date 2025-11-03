import React from 'react';

interface CustomImgProps {
    src?: string;
    alt?: string;
    className?: string;
}

const FALLBACK_ICON = "./img/day/113.png";

const CustomImg = ({ src, alt = 'weather icon', className }: CustomImgProps) => {
    return (
        <img
            src={src || FALLBACK_ICON}
            alt={alt}
            id="img"
            className={className}
        />
    );
};

export default CustomImg;
