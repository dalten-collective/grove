import React from 'react';
import cn from 'classnames';

import Dialog, { DialogClose, DialogContent } from './Dialog';

function SubmitIssue({ error }) {
  const title = error.message;
  const body = `\`\`\`%0A${error.stack?.replaceAll('\n', '%0A')}%0A\`\`\``;

  return (
    <a
      className="button"
      href={`https://github.com/dalten-collective/trove/issues/new?assignees=&labels=bug&template=bug_report.md&title=${title}&body=${body}`}
      target="_blank"
      rel="noreferrer"
    >
      Submit Issue
    </a>
  );
}

export default function ErrorAlert({ error, resetErrorBoundary, className }) {
  return (
    <Dialog defaultOpen modal onOpenChange={() => resetErrorBoundary()}>
      <DialogContent
        showClose={false}
        className={cn('space-y-6 pr-8', className)}
        containerClass="w-full max-w-3xl"
      >
        <h2 className="h4">
          <span className="mr-3 text-orange-500">Encountered error:</span>
          <span className="font-mono">{error.message}</span>
        </h2>
        {error.stack && (
          <div className="w-full overflow-x-auto rounded bg-gray-50 p-2">
            <pre>{error.stack}</pre>
          </div>
        )}
        <div className="flex space-x-6">
          <DialogClose className="button">Try Again</DialogClose>
          <DialogClose asChild>
            <SubmitIssue error={error} />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
