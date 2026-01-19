'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { clsx } from 'clsx';

interface AppImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const AppImage = ({
  src,
  alt,
  fallbackSrc = '/assets/images/placeholder.png',
  className,
  ...props
}: AppImageProps) => {
  // 1. Determine the valid source
  const validSrc = src || fallbackSrc;
  const [imageSrc, setImageSrc] = useState<string>(validSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  // 2. Safety Check: Is it an external URL?
  const isExternal = validSrc ? (validSrc.startsWith('http') || validSrc.startsWith('//')) : false;

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  if (!imageSrc) return null;

  // 3. AUTO-FIX: If no width/height/fill is provided, force "fill" to prevent crash
  // This checks if the user forgot to set dimensions
  const hasDimensions = props.width !== undefined || props.height !== undefined;
  const hasFill = props.fill === true;
  const shouldForceFill = !hasDimensions && !hasFill;

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <Image
        {...props}
        src={imageSrc}
        alt={alt}
        // If we force fill, we add the prop here
        fill={hasFill || shouldForceFill}
        onError={handleError}
        unoptimized={isExternal}
        // Ensure the image covers the area if we are filling
        className={clsx(
          props.className, 
          (hasFill || shouldForceFill) && 'object-cover'
        )}
      />
    </div>
  );
};

export default AppImage;