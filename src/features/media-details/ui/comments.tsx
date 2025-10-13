'use client';

import { useCallback, useState, useRef } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { useUser } from '@clerk/nextjs';
import { useComments } from '../model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import dynamic from 'next/dynamic';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { useQuery } from 'convex/react';
import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip';

dayjs.extend(relativeTime);

const GiphyGrid = dynamic(
  () => import('@giphy/react-components').then((m) => m.Grid),
  { ssr: false }
);

const gf = new GiphyFetch(
  process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'JjqYLJ1TVlFiC3WbFWqQdbvCBJdW1nr8'
);

// helper for inserting text at caret position
const insertAtCaret = (value: string, insert: string, inputRef: any) => {
  const input = inputRef.current;
  if (!input) return value;
  const { selectionStart, selectionEnd } = input;
  return value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
};

export const Comments = ({ id }: { id: number | string }) => {
  const [gifOpen, setGifOpen] = useState(false);
  const [gifSearch, setGifSearch] = useState('');
  const inputRef = useRef<any>(null);
  const [selectedMention, setSelectedMention] = useState<Id<'users'> | null>(
    null
  );

  const fetchGifs = useCallback(
    (offset: number) =>
      gifSearch
        ? gf.search(gifSearch, { offset, limit: 9 })
        : gf.trending({ offset, limit: 9 }),
    [gifSearch]
  );

  const mentionUsers = useQuery(api.users.getUsersNicknames);
  const mentionUser = useQuery(
    api.users.getUserById,
    selectedMention ? { id: selectedMention } : 'skip'
  );

  const { user } = useUser();
  const { commentsList, addComment } = useComments(+id);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;

    const mentionIds = Array.from(text.matchAll(/@\[(.+?)\]\((.+?)\)/g)).map(
      ([, _display, id]) => id
    );

    addComment({
      mediaId: +id,
      comment: text,
      mention: mentionIds,
      user: {
        id: user?.id || '',
        nickname: user?.username || user?.firstName || '',
        picture: user?.imageUrl || '',
      },
    });

    setText('');
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className='space-y-6'>
        {/* Editor */}
        <div className='flex flex-col rounded-xl bg-background p-4 text-white'>
          <MentionsInput
            inputRef={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Коментар... (Максимум 500 символів)'
            className='mentions'
            style={{
              control: {
                backgroundColor: '#1c1c1e',
                fontSize: 14,
                color: '#fff',
                border: '1px solid #2c2c2e',
                borderRadius: '0.5rem',
                minHeight: 63,
                fontFamily: 'inherit',
              },
              '&multiLine': {
                control: { fontFamily: 'inherit', minHeight: 63 },
                highlighter: { padding: 9 },
                input: {
                  padding: 9,
                  border: '1px solid #2c2c2e',
                  backgroundColor: 'transparent',
                  color: '#fff',
                },
              },
              suggestions: {
                list: {
                  backgroundColor: '#2c2c2e',
                  border: '1px solid #3a3a3c',
                  fontSize: 14,
                  maxHeight: 200,
                  overflowY: 'auto',
                },
                item: {
                  padding: '5px 15px',
                  borderBottom: '1px solid #3a3a3c',
                  color: '#fff',
                  '&focused': { backgroundColor: '#3b82f6', color: '#fff' },
                },
              },
            }}
          >
            <Mention
              trigger='@'
              data={mentionUsers}
              displayTransform={(id, display) => `@${display}`}
              style={{ backgroundColor: '#3b82f6', borderRadius: '0.25rem' }}
            />
          </MentionsInput>

          <button
            className='mt-2 w-fit rounded bg-blue-500 px-3 py-1 text-white'
            onClick={() => setGifOpen(true)}
          >
            GIF
          </button>

          {gifOpen && (
            <div className='mt-2 max-h-80 w-full overflow-y-auto rounded-lg border bg-background p-2 shadow-lg'>
              <input
                type='text'
                placeholder='Search GIFs...'
                value={gifSearch}
                onChange={(e) => setGifSearch(e.target.value)}
                className='mb-2 w-full rounded border px-2 py-1 text-black'
              />
              <GiphyGrid
                width={400}
                columns={3}
                fetchGifs={fetchGifs}
                noLink
                onGifClick={(gif) => {
                  const gifTag = `[GIF:${gif.images.fixed_height.url}]`;
                  setText((t) => insertAtCaret(t, gifTag + ' ', inputRef));
                  setGifOpen(false);
                }}
              />
            </div>
          )}

          <button
            className='mt-2 w-fit rounded bg-green-500 px-3 py-1 text-white'
            onClick={handleSubmit}
          >
            Надіслати
          </button>
        </div>

        {/* Comments list */}
        <div className='space-y-4 overflow-y-auto rounded-xl border bg-muted p-4 shadow-inner'>
          {commentsList?.map((item) => {
            const createdAt = dayjs(item._creationTime).locale('uk').fromNow();
            const regex = /(@\[(.+?)\]\((.+?)\))|(\[GIF:(.+?)\])/g;

            const parts: JSX.Element[] = [];
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(item.comment)) !== null) {
              if (match.index > lastIndex) {
                parts.push(
                  <span key={lastIndex}>
                    {item.comment.slice(lastIndex, match.index)}
                  </span>
                );
              }

              if (match[1]) {
                const display = match[2];
                const userId = match[3];

                // Local open state per mention
                const MentionWithTooltip = () => {
                  const [open, setOpen] = useState(false);
                  const userData = useQuery(
                    api.users.getUserById,
                    open ? { id: userId } : 'skip'
                  );

                  return (
                    <Tooltip open={open} onOpenChange={setOpen}>
                      <TooltipTrigger asChild>
                        <span
                          className='cursor-pointer text-blue-400'
                          onMouseEnter={() => setOpen(true)}
                          onMouseLeave={() => setOpen(false)}
                        >
                          @{display}
                        </span>
                      </TooltipTrigger>
                      {userData && (
                        <TooltipContent className='flex items-center gap-2'>
                          {userData.avatar && (
                            <img
                              src={userData.avatar}
                              alt={userData.nickname}
                              className='h-6 w-6 rounded-full'
                            />
                          )}
                          <span>{userData.nickname}</span>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                };

                parts.push(<MentionWithTooltip key={match.index} />);
              } else if (match[4]) {
                const url = match[5];
                parts.push(
                  <img
                    key={match.index}
                    src={url}
                    className='inline max-h-40 rounded'
                  />
                );
              }

              lastIndex = regex.lastIndex;
            }

            if (lastIndex < item.comment.length) {
              parts.push(
                <span key={lastIndex}>{item.comment.slice(lastIndex)}</span>
              );
            }

            return (
              <div
                key={item._id}
                className='rounded-xl border border-border bg-background p-4 transition-shadow hover:shadow-md'
              >
                <div className='mb-2 flex items-center gap-3'>
                  <img
                    width={32}
                    height={32}
                    src={item.user.picture}
                    alt={item.user.nickname}
                    className='rounded-full object-cover'
                  />
                  <div className='flex flex-col text-sm'>
                    <span className='font-semibold text-foreground'>
                      {item.user.nickname}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      {createdAt}
                    </span>
                  </div>
                </div>
                <div className='break-words text-sm text-muted-foreground'>
                  {parts}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
