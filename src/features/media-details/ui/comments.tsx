import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useUser } from '@clerk/nextjs';
import { DeleteIcon, ReplyIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useComments } from '../model';
import Image from 'next/image';

dayjs.extend(relativeTime);

const Comments = ({ id }: { id: number | string }) => {
  const { user } = useUser();
  const { commentsList, addComment, deleteComment } = useComments(+id);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<null | {
    id: string;
    nickname: string;
    commentId: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment({
      mediaId: +id,
      comment: newComment,
      user: {
        id: user?.id || '',
        nickname: user?.username || user?.firstName || '',
        picture: user?.imageUrl || '',
      },
      replyTo: replyTo
        ? {
            userId: replyTo.id,
            nickname: replyTo.nickname,
            commentId: replyTo.commentId,
          }
        : undefined,
    });

    setNewComment('');
    setReplyTo(null);
  };

  return (
    <div className='space-y-6'>
      {replyTo && (
        <div className='flex items-center justify-between rounded-md bg-muted px-4 py-2 text-sm text-foreground'>
          <div>
            Відповідь до{' '}
            <span className='font-semibold'>{replyTo.nickname}</span>
          </div>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => setReplyTo(null)}
            aria-label='Скасувати відповідь'
          >
            <XIcon className='h-5 w-5' />
          </Button>
        </div>
      )}
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:flex-row'>
        <Input
          placeholder='Напишіть коментар...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='flex-1'
          autoFocus={!!replyTo}
        />
        <Button type='submit' size='sm' className='sm:w-auto'>
          Надіслати
        </Button>
      </form>
      <div
        className='space-y-4 overflow-y-auto rounded-xl border bg-muted p-4 shadow-inner'
        style={{ maxHeight: '800px' }}
      >
        {commentsList?.map((item) => {
          const canDelete = item.user.id === user?.id;
          const createdAt = dayjs(item._creationTime).fromNow();

          return (
            <div
              key={item._id}
              className='rounded-xl border border-border bg-background p-4 transition-shadow hover:shadow-md'
            >
              <div className='mb-2 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Image
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

                <div className='flex items-center gap-2'>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={() =>
                      setReplyTo({
                        id: item.user.id,
                        nickname: item.user.nickname,
                        commentId: item._id,
                      })
                    }
                    aria-label='Відповісти'
                    title='Відповісти'
                  >
                    <ReplyIcon className='h-5 w-5' />
                  </Button>

                  {canDelete && (
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-destructive hover:bg-destructive/10'
                      onClick={() => deleteComment({ id: item._id })}
                      aria-label='Видалити'
                      title='Видалити'
                    >
                      <DeleteIcon className='h-5 w-5' />
                    </Button>
                  )}
                </div>
              </div>
              {item.replyTo &&
                (() => {
                  const parentComment = commentsList?.find(
                    (c) => c._id === item.replyTo?.commentId
                  );

                  if (!parentComment) return null;

                  return (
                    <div className='mb-3 rounded-md border border-border bg-muted px-4 py-2 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <span className='font-semibold'>
                          {parentComment.user.nickname}
                        </span>
                      </div>
                      <p className='mt-1 text-xs italic text-muted-foreground'>
                        {parentComment.comment}
                      </p>
                    </div>
                  );
                })()}

              <p className='text-sm text-muted-foreground'>{item.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Comments };
