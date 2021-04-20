import { useState } from "react";
import { postAPI } from "./lib/API";

function WatchlistButton({ accountId, sessionId, mediaId, mediaType }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      class="btn btn-primary"
      onClick={() => {
        postAPI(`/account/${accountId}/watchlist`, {
        }, {
          session_id: sessionId,
          media_type: mediaType,
          media_id: mediaId,
          watchlist: true,
        }).then((json) => { setAdded(true); });
      }}
    >
      {added ? 'Added!' : 'Add to Watchlist'}
    </button>
  )
}

export default WatchlistButton;
