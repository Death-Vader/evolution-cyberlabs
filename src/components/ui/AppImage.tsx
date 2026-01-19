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
  const validSrc = src || fallbackSrc;
  const [imageSrc, setImageSrc] = useState<string>(validSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const isExternal = validSrc ? (validSrc.startsWith('http') || validSrc.startsWith('//')) : false;

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  if (!imageSrc) return null;

  // Determine if we need to force "fill" mode
  const hasDimensions = props.width !== undefined || props.height !== undefined;
  const hasFill = props.fill === true;
  const shouldForceFill = !hasDimensions && !hasFill;

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <Image
        {...props}
        src={imageSrc}
        alt={alt}
        fill={hasFill || shouldForceFill}
        onError={handleError}
        unoptimized={isExternal}
        // FIX: Removed "props.className" which caused the error
        className={clsx(
          (hasFill || shouldForceFill) && 'object-cover'
        )}
      />
    </div>
  );
};

export default AppImage;