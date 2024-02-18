import EmojiPicker from "emoji-picker-react";
import { Emoji } from "emoji-picker-react";
import { useState } from "react";

function EmojiInput({ setEmoji, value }) {
  const [emojiOpen, setEmojiOpen] = useState(false);
  return (
    <div className="bg-light border-rounded-lg p-2">
      <div onClick={() => setEmojiOpen(true)} style={{ cursor: "pointer" }}>
        <Emoji unified={value} size="25" />
      </div>
      <div>
        <EmojiPicker
          open={emojiOpen}
          searchPlaceholder="00000"
          onEmojiClick={(emoji) => {
            console.log(emoji.unified);
            setEmojiOpen(false);
            setEmoji(emoji.unified);
          }}
          width={300}
          height={400}
          className="position-absolute"
        />
      </div>
    </div>
  );
}

export default EmojiInput;
