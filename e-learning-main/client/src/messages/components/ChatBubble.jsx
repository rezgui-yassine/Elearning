import React, { useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { MessageProps } from "./types";
import daysjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";



daysjs.extend(relativeTime);
const ChatBubble = (props) => {
  const { text, variant, createdAt, attachment = undefined, senderId,userId } = props;
  const isSent = variant === "sent";
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCelebrated, setIsCelebrated] = useState(false);
  function dateDiffFromNow(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - givenDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return (
    <Box sx={{ maxWidth: "60%", minWidth: "auto" }}>
      <Stack
        direction="row"
        justifytext="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">
          {senderId._id === userId ? "You": senderId?.firstName}
        </Typography>
        <Typography level="body-xs">{daysjs(createdAt).fromNow()}</Typography>
      </Stack>
     
        <Box
          sx={{ position: "relative" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sheet
            color={isSent ? "primary" : "neutral"}
            variant={isSent ? "solid" : "soft"}
            sx={{
              p: 1.25,
              borderRadius: "lg",
              borderTopRightRadius: isSent ? 0 : "lg",
              borderTopLeftRadius: isSent ? "lg" : 0,
              backgroundColor: isSent
                ? "var(--joy-palette-primary-solidBg)"
                : "background.body",
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: isSent
                  ? "var(--joy-palette-common-white)"
                  : "var(--joy-palette-text-primary)",
              }}
            >
              {text}
            </Typography>
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifytext={isSent ? "flex-end" : "flex-start"}
              spacing={0.5}
              sx={{
                position: "absolute",
                top: "50%",
                p: 1.5,
                ...(isSent
                  ? {
                      left: 0,
                      transform: "translate(-100%, -50%)",
                    }
                  : {
                      right: 0,
                      transform: "translate(100%, -50%)",
                    }),
              }}
            >
              <IconButton
                variant={isLiked ? "soft" : "plain"}
                color={isLiked ? "danger" : "neutral"}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? "❤️" : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                variant={isCelebrated ? "soft" : "plain"}
                color={isCelebrated ? "warning" : "neutral"}
                size="sm"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? "🎉" : <CelebrationOutlinedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
      
    </Box>
  );
};

export default ChatBubble;
