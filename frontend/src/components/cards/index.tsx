/* next/image responsive layout is hell, so I'm using <img /> for now*/
/* eslint-disable @next/next/no-img-element */
import React from "react";

import classNames from "classnames";
import Image from "next/image";

import Link from "@components/common/Link";
import { IAuthor } from "interfaces";

interface ImageCardProps {
  imageUrl: string;
  imageAlt: string;
  author?: IAuthor;
  noAnimation?: boolean;
}

export const ImagePreviewCard = ({ imageUrl, imageAlt }: ImageCardProps) => {
  return (
    <figure className="relative h-full w-full">
      <Image
        className={classNames("cursor-pointer rounded-sm")}
        src={imageUrl}
        alt={imageAlt}
        width="100%"
        height="100%"
        layout="fill"
        objectFit="contain"
      />
    </figure>
  );
};

const ImageCard = ({
  imageUrl,
  imageAlt,
  author,
  noAnimation = false,
}: ImageCardProps) => {
  return (
    <figure className="group relative flex h-full items-end">
      <img
        className={classNames("cursor-pointer rounded-sm duration-200", {
          "group-hover:brightness-75": !noAnimation,
        })}
        src={imageUrl}
        alt={imageAlt}
        width="100%"
        height="100%"
      />
      <div className="absolute w-full">
        {author && noAnimation === false && (
          <Link
            className="flex cursor-pointer opacity-0 duration-200 group-hover:opacity-100"
            href={`/${author.username}`}
          >
            <div className="flex items-center gap-x-3 rounded-t-md bg-black/0 px-5 py-2 duration-200 hover:bg-black/40">
              <Image
                src={author.avatar || "/assets/images/default-avatar.png"}
                alt={author.name}
                width={36}
                height={36}
                layout="fixed"
                className="rounded-full"
              />
              <span className="text-base text-gray-100 duration-100 hover:text-white">
                {author.name}
              </span>
            </div>
          </Link>
        )}
      </div>
    </figure>
  );
};

export default ImageCard;
