"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { shuffle } from "lodash";
import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import { useRef } from "react";
import { Comments } from "./comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistance } from "date-fns";
import { CheckCircleIcon, DotIcon } from "lucide-react";

function getVotesFor(thumbnail: Doc<"thumbnails">, imageId: string) {
  if (!thumbnail) return 0;
  return thumbnail.aImage === imageId ? thumbnail.aVotes : thumbnail?.bVotes;
}

function getVotePercent(thumbnail: Doc<"thumbnails">, imageId: string) {
  if (!thumbnail) return 0;
  const totalVotes = thumbnail.aVotes + thumbnail.bVotes;
  if (totalVotes === 0) return 0;
  return Math.round((getVotesFor(thumbnail, imageId) / totalVotes) * 100);
}

function ThumbnailTestImage({
  imageId,
  thumbnail,
  hasVoted,
}: {
  imageId: string;
  thumbnail: Doc<"thumbnails">;
  hasVoted: boolean;
}) {
  const voteOnThumbnail = useMutation(api.thumbnails.voteOnThumbnail);

  return (
    <div className="flex flex-col gap-4">
      <Image
        width="600"
        height="600"
        alt="image test a"
        className="w-full"
        src={getImageUrl(imageId)}
      />

      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={thumbnail.profileImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-gray-300">
          <div className="font-bold mb-2 text-white">{thumbnail.title}</div>
          <div className="flex gap-2 items-center">
            {thumbnail.name} <CheckCircleIcon size={12} />
          </div>
          <div className="flex">
            <div>152K Views</div>
            <DotIcon />
            {formatDistance(new Date(thumbnail._creationTime), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>

      {hasVoted ? (
        <>
          <Progress
            value={getVotePercent(thumbnail, imageId)}
            className="w-full"
          />
          <div className="text-lg">{getVotesFor(thumbnail, imageId)} votes</div>
        </>
      ) : (
        <Button
          onClick={() => {
            voteOnThumbnail({
              thumbnailId: thumbnail._id,
              imageId: imageId,
            });
          }}
          size="lg"
          className="w-fit"
        >
          Vote A
        </Button>
      )}
    </div>
  );
}

export default function ThumbnailPage() {
  const params = useParams<{ thumbnailId: Id<"thumbnails"> }>();
  const thumbnailId = params.thumbnailId;
  const thumbnail = useQuery(api.thumbnails.getThumbnail, {
    thumbnailId,
  });
  const images = useRef<string[] | undefined>(undefined);

  const session = useSession();

  if (!thumbnail || !session.session) {
    return <div>Loading...</div>;
  }

  if (!images.current) {
    images.current = shuffle([thumbnail.aImage, thumbnail.bImage]);
  }
  const [firstImageId, secondImageId] = images.current;

  const hasVoted = thumbnail.voteIds.includes(session.session.user.id);

  return (
    <div className="mt-16 gap-12 flex flex-col">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <ThumbnailTestImage
          hasVoted={hasVoted}
          imageId={firstImageId}
          thumbnail={thumbnail}
        />

        <ThumbnailTestImage
          hasVoted={hasVoted}
          imageId={secondImageId}
          thumbnail={thumbnail}
        />
      </div>

      <Comments thumbnail={thumbnail} />
    </div>
  );
}
