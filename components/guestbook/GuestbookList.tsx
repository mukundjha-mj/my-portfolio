import { GuestbookEntryItem, type Entry } from "./GuestbookEntryItem";

type TopLevelEntry = Entry & { replies: Entry[] };

export function GuestbookList({
  entries,
  signedIn,
}: {
  entries: TopLevelEntry[];
  signedIn: boolean;
}) {
  if (entries.length === 0) {
    return (
      <p className="mt-6 text-sm text-muted">
        No messages yet — be the first to sign the guestbook.
      </p>
    );
  }

  return (
    <ul className="mt-6 space-y-5">
      {entries.map((e) => (
        <li key={e.id}>
          <ul>
            <GuestbookEntryItem entry={e} signedIn={signedIn} canReply />
          </ul>

          {e.replies.length > 0 && (
            <ul className="mt-3 ml-6 space-y-3 border-l border-border pl-3 sm:ml-11 sm:pl-4">
              {e.replies.map((r) => (
                <GuestbookEntryItem
                  key={r.id}
                  entry={r}
                  signedIn={signedIn}
                  canReply={false}
                />
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
