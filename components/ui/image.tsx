"use client";

import * as React from "react";
import { useSize } from "@/hooks/use-size";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE_URL =
  "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

const WIX_MEDIA_HOSTS = [
  "media.base44.com",
  "static.wixstatic.com",
];

const DEFAULT_TRANSFORM_WIDTH = 1024;
const DEVICE_PIXEL_RATIOS = [1, 2, 3];
const MAX_DIMENSION = 6000;

type FittingType = "fill" | "fit";

interface FocalPoint {
  x: number;
  y: number;
}

interface ImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "loading"
  > {
  src?: string;
  fittingType?: FittingType;
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
  quality?: number;

  /**
   * Load immediately and prioritize this image.
   * Useful for hero/LCP images.
   */
  priority?: boolean;

  /**
   * Native image loading behavior.
   */
  loading?: "lazy" | "eager";
}

interface ParsedWixMedia {
  baseUrl: string;
  filename: string;
}

interface TransformOptions {
  width: number;
  height?: number;
  crop: boolean;
  focalPoint?: FocalPoint;
  quality: number;
}

/**
 * Detect Wix/Base44 media URLs and remove existing transformations.
 */
function parseWixMediaUrl(
  src: string
): ParsedWixMedia | null {
  try {
    const url = new URL(src);

    if (!WIX_MEDIA_HOSTS.includes(url.hostname)) {
      return null;
    }

    const v1Index = url.pathname.indexOf("/v1/");

    const basePath =
      v1Index === -1
        ? url.pathname
        : url.pathname.slice(0, v1Index);

    const filename = basePath.split("/").pop();

    if (!filename || /\.svg$/i.test(filename)) {
      return null;
    }

    return {
      baseUrl: `${url.origin}${basePath}`,
      filename,
    };
  } catch {
    return null;
  }
}

function clampDim(value: number): number {
  return Math.min(
    Math.max(Math.round(value), 1),
    MAX_DIMENSION
  );
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Build a Wix Media transformation URL.
 *
 * Example:
 *
 * /v1/fill/w_800,h_500,fp_0.50_0.40,q_90,.../image.webp
 */
function buildTransformUrl(
  parsed: ParsedWixMedia,
  options: TransformOptions
): string {
  const {
    baseUrl,
    filename,
  } = parsed;

  const {
    width,
    height,
    crop,
    focalPoint,
    quality,
  } = options;

  const params: string[] = [
    `w_${clampDim(width)}`,
    `h_${clampDim(height || width)}`,
  ];

  if (crop) {
    if (focalPoint) {
      params.push(
        `fp_${clamp01(focalPoint.x).toFixed(2)}_${clamp01(
          focalPoint.y
        ).toFixed(2)}`
      );
    } else {
      params.push("al_c");
    }
  }

  params.push(
    `q_${quality}`,
    "usm_0.66_1.00_0.01",
    "enc_webp",
    "quality_auto"
  );

  const outputName = /\.gif$/i.test(filename)
    ? filename
    : filename.replace(/\.[a-z0-9]+$/i, "") + ".webp";

  return `${baseUrl}/v1/${
    crop ? "fill" : "fit"
  }/${params.join(",")}/${outputName}`;
}

/**
 * Build responsive 1x / 2x / 3x sources.
 */
function buildSrcSet(
  parsed: ParsedWixMedia,
  options: TransformOptions
): string {
  return DEVICE_PIXEL_RATIOS.map((dpr) => {
    const transformedUrl = buildTransformUrl(
      parsed,
      {
        ...options,
        width: options.width * dpr,
        height: options.height
          ? options.height * dpr
          : undefined,
      }
    );

    return `${transformedUrl} ${dpr}x`;
  }).join(", ");
}

interface ImageWrapperProps {
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ImageWrapper = React.forwardRef<
  HTMLSpanElement,
  ImageWrapperProps
>(
  (
    {
      aspectRatio,
      className,
      style,
      children,
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-block h-full w-full",
          className
        )}
        style={{
          aspectRatio,
          ...style,
        }}
      >
        {children}
      </span>
    );
  }
);

ImageWrapper.displayName = "ImageWrapper";

interface ResponsiveImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "loading"
  > {
  parsed: ParsedWixMedia;
  fittingType: FittingType;
  focalPoint?: FocalPoint;
  quality: number;
  aspectRatio?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

const ResponsiveImage = React.forwardRef<
  HTMLImageElement,
  ResponsiveImageProps
>(
  (
    {
      parsed,
      fittingType,
      focalPoint,
      quality,
      className,
      style,
      aspectRatio,
      onLoad,
      priority = false,
      loading = "lazy",
      ...props
    },
    parentRef
  ) => {
    const wrapperRef =
      React.useRef<HTMLSpanElement>(null);

    const imgRef =
      React.useRef<HTMLImageElement>(null);

    const size = useSize(wrapperRef);

    const [loaded, setLoaded] =
      React.useState(false);

    React.useImperativeHandle(
      parentRef,
      () => imgRef.current as HTMLImageElement
    );

    React.useEffect(() => {
      setLoaded(false);
    }, [parsed.baseUrl]);

    const crop = fittingType !== "fit";

    const options: TransformOptions | null =
      size
        ? {
            width:
              size.width ||
              DEFAULT_TRANSFORM_WIDTH,

            height:
              size.height ||
              undefined,

            crop,

            focalPoint: crop
              ? focalPoint
              : undefined,

            quality,
          }
        : null;

    if (!options) {
      return (
        <ImageWrapper
          ref={wrapperRef}
          aspectRatio={aspectRatio}
          className={className}
          style={style}
        />
      );
    }

    const mainImageUrl =
      buildTransformUrl(
        parsed,
        options
      );

    const srcSet =
      buildSrcSet(
        parsed,
        options
      );

    const placeholderUrl =
      buildTransformUrl(
        parsed,
        {
          ...options,
          width: 20,
          height: options.height
            ? Math.max(
                1,
                Math.round(
                  (20 * options.height) /
                    options.width
                )
              )
            : undefined,
          quality: 20,
        }
      );

    return (
      <ImageWrapper
        ref={wrapperRef}
        aspectRatio={aspectRatio}
        className={className}
        style={style}
      >
        {!loaded && !priority && (
          <img
            src={placeholderUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            style={{
              objectFit:
                fittingType === "fit"
                  ? "contain"
                  : "cover",
              filter: "blur(10px)",
              transform: "scale(1.1)",
            }}
          />
        )}

        <img
          ref={imgRef}
          src={mainImageUrl}
          srcSet={srcSet}
          loading={
            priority
              ? "eager"
              : loading
          }
          fetchPriority={
            priority
              ? "high"
              : "auto"
          }
          className={cn(
            "absolute inset-0 h-full w-full",
            fittingType === "fit"
              ? "object-contain"
              : "object-cover",
            !loaded &&
              !priority &&
              "opacity-0",
            loaded &&
              "opacity-100",
            "transition-opacity duration-300"
          )}
          onLoad={(event) => {
            setLoaded(true);
            onLoad?.(event);
          }}
          {...props}
        />
      </ImageWrapper>
    );
  }
);

ResponsiveImage.displayName =
  "ResponsiveImage";

/**
 * Custom image component optimized for
 * Base44/Wix media URLs.
 */
const Image = React.forwardRef<
  HTMLImageElement,
  ImageProps
>(
  (
    {
      src,
      fittingType = "fill",
      originWidth,
      originHeight,
      focalPointX,
      focalPointY,
      quality = 90,
      priority = false,
      loading = "lazy",
      ...props
    },
    ref
  ) => {
    const [imgSrc, setImgSrc] =
      React.useState(src);

    React.useEffect(() => {
      setImgSrc(src);
    }, [src]);

    const handleError = () => {
      setImgSrc(FALLBACK_IMAGE_URL);
    };

    if (!src) {
      return (
        <img
          ref={ref}
          src={FALLBACK_IMAGE_URL}
          {...props}
          onError={handleError}
          data-empty-image
        />
      );
    }

    /**
     * If the URL is not Base44/Wix,
     * render it as a normal image.
     */
    const parsed =
      imgSrc === FALLBACK_IMAGE_URL
        ? null
        : parseWixMediaUrl(imgSrc || "");

    if (!parsed) {
      return (
        <img
          ref={ref}
          src={imgSrc}
          {...props}
          loading={loading}
          fetchPriority={
            priority ? "high" : "auto"
          }
          onError={handleError}
          data-error-image={
            imgSrc === FALLBACK_IMAGE_URL
              ? true
              : undefined
          }
        />
      );
    }

    const focalPoint =
      typeof focalPointX === "number" &&
      typeof focalPointY === "number"
        ? {
            x: focalPointX,
            y: focalPointY,
          }
        : undefined;

    const aspectRatio =
      originWidth &&
      originHeight
        ? `${originWidth} / ${originHeight}`
        : undefined;

    return (
      <ResponsiveImage
        ref={ref}
        parsed={parsed}
        fittingType={fittingType}
        focalPoint={focalPoint}
        quality={quality}
        aspectRatio={aspectRatio}
        priority={priority}
        loading={loading}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image };

