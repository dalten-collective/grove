// import { useCallback, useEffect, useState, useRef } from 'react';
// import cn from 'classnames';
// import { intersection, findLast } from 'lodash';
// import { useForm } from 'react-hook-form';
// import LinkIcon from 'landscape-apps/dist/src/components/icons/LinkIcon';
// import {
//   useHeapPerms,
//   useHeapState,
// } from 'landscape-apps/dist/src/state/heap/heap';
// import useNest from 'landscape-apps/dist/src/logic/useNest';
// import { isValidUrl, nestToFlag } from 'landscape-apps/dist/src/logic/utils';
// import { useRouteGroup, useVessel } from 'landscape-apps/dist/src/state/groups';
// import Text16Icon from 'landscape-apps/dist/src/components/icons/Text16Icon';
// import useRequestState from 'landscape-apps/dist/src/logic/useRequestState';
// import { GRID, LINK, LIST, TEXT } from 'landscape-apps/dist/src/types/heap';
// import LoadingSpinner from 'landscape-apps/dist/src/components/LoadingSpinner/LoadingSpinner';
// import { UploadErrorPopover } from 'landscape-apps/dist/src/chat/ChatInput/ChatInput';
// import { useHeapDisplayMode } from 'landscape-apps/dist/src/state/settings';
// import { useFileStore } from 'landscape-apps/dist/src/state/storage';
// import useFileUpload from 'landscape-apps/dist/src/logic/useFileUpload';
// import HeapTextInput from 'landscape-apps/dist/src/heap/HeapTextInput';

// export default function NewCurioForm() {
//   const [inputMode, setInputMode] = useState(LINK);
//   const [draftLink, setDraftLink] = useState();
//   const [draftText, setDraftText] = useState();
//   // const flag = useRouteGroup();
//   const nest = useNest();
//   const [, chFlag] = nestToFlag(nest);
//   const displayMode = useHeapDisplayMode(chFlag);
//   const isGridMode = displayMode === GRID;
//   const isListMode = displayMode === LIST;
//   const isLinkMode = inputMode === LINK;
//   const isTextMode = inputMode === TEXT;
//   // const perms = useHeapPerms(nest);
//   // const vessel = useVessel(flag, window.our);
//   // const canWrite =
//   //   perms.writers.length === 0 ||
//   //   intersection(perms.writers, vessel.sects).length !== 0;
//   const [uploadError, setUploadError] = useState(null);
//   const { loaded, hasCredentials, promptUpload } = useFileUpload();
//   const fileId = useRef(`chat-input-${Math.floor(Math.random() * 1000000)}`);
//   const mostRecentFile = useFileStore((state) =>
//     findLast(state.files, ['for', fileId.current])
//   );
//   const { register, handleSubmit, reset, watch, setValue } = useForm({
//     defaultValues: {
//       content: '',
//     },
//   });
//   useEffect(() => {
//     if (
//       mostRecentFile &&
//       mostRecentFile.status === 'error' &&
//       mostRecentFile.errorMessage
//     ) {
//       setUploadError(mostRecentFile.errorMessage);
//     }
//     if (mostRecentFile && mostRecentFile.status === 'success') {
//       setValue('content', mostRecentFile.url, {
//         shouldDirty: true,
//         shouldTouch: true,
//       });
//     }
//   }, [mostRecentFile, setValue]);
//   const { isPending, setPending, setReady } = useRequestState();
//   const onSubmit = useCallback(
//     async ({ content }) => {
//       await useHeapState.getState().addCurio(chFlag, {
//         title: '',
//         content: { block: [], inline: [{ link: { href: content, content } }] },
//         author: window.our,
//         sent: Date.now(),
//         replying: null,
//       });
//       setDraftLink(undefined);
//       reset();
//     },
//     [chFlag, reset]
//   );
//   const watchedContent = watch('content');
//   const isValidInput = isValidUrl(watchedContent);
//   // For Link mode, prevent newline entry + allow submit with Enter
//   const onKeyDown = useCallback(
//     async (e) => {
//       if (e.key === 'Enter') {
//         e.preventDefault();
//         if (isPending) {
//           return;
//         }
//         if (isValidInput) {
//           setPending();
//           await handleSubmit(onSubmit)();
//           setReady();
//         }
//       }
//     },
//     [handleSubmit, isPending, isValidInput, onSubmit, setPending, setReady]
//   );
//   useEffect(() => {
//     if (watchedContent) {
//       setDraftLink(watchedContent);
//     }
//   }, [watchedContent]);
//   if (!canWrite) {
//     return null;
//   }

//   const modeToggle = (className) => (
//     <div className={cn('flex', className)}>
//       <button
//         type="button"
//         className={cn(
//           isLinkMode ? 'button' : 'secondary-button',
//           isListMode && 'max-w-[120px] rounded-bl-none',
//           'flex-1 rounded-r-none'
//         )}
//         onClick={() => setInputMode(LINK)}
//       >
//         <LinkIcon className="mr-1 h-4 w-4" />
//         <span className="ml-1">Link</span>
//       </button>
//       <button
//         type="button"
//         className={cn(
//           isTextMode ? 'button' : 'secondary-button',
//           isListMode && 'max-w-[120px] rounded-br-none',
//           'flex-1 rounded-l-none'
//         )}
//         onClick={() => setInputMode(TEXT)}
//       >
//         <Text16Icon className="mr-1 h-4 w-4" />
//         <span className="ml-1">Text</span>
//       </button>
//     </div>
//   );

//   return (
//     <div className={cn(isGridMode && 'aspect-h-1 aspect-w-1')}>
//       {isListMode ? modeToggle() : null}
//       <div
//         className={cn(
//           isGridMode ? 'heap-block flex-col p-1' : 'heap-row h-min flex-row',
//           'flex cursor-auto'
//         )}
//       >
//         {isGridMode ? modeToggle('mb-1') : null}
//         {isLinkMode ? (
//           <form onSubmit={handleSubmit(onSubmit)} className="relative flex-1">
//             <textarea
//               {...register('content')}
//               className={cn(
//                 'mb-4 h-full w-full resize-none rounded-lg border-2 py-1 px-2 leading-5 text-gray-800 placeholder:align-text-top placeholder:font-semibold placeholder:text-gray-400 focus:outline-none',
//                 isListMode
//                   ? 'min-h-[60px] rounded-tl-none border-gray-100 bg-white align-middle focus:border-gray-300'
//                   : 'border-gray-50 bg-gray-50'
//               )}
//               placeholder="Paste Link Here"
//               onKeyDown={onKeyDown}
//               defaultValue={draftLink}
//             />
//             {loaded && hasCredentials ? (
//               <button
//                 title={'Upload an image'}
//                 className="button absolute bottom-3 left-3 whitespace-nowrap rounded-md px-2 py-1"
//                 aria-label="Add attachment"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   promptUpload(fileId.current);
//                 }}
//               >
//                 {mostRecentFile && mostRecentFile.status === 'loading' ? (
//                   <LoadingSpinner secondary="black" className="h-4 w-4" />
//                 ) : (
//                   'Upload Image'
//                 )}
//               </button>
//             ) : null}
//             {uploadError ? (
//               <div className="absolute mr-2">
//                 <UploadErrorPopover
//                   errorMessage={uploadError}
//                   setUploadError={setUploadError}
//                 />
//               </div>
//             ) : null}
//             <input
//               value={isPending ? 'Posting...' : 'Post'}
//               type="submit"
//               className="button absolute bottom-3 right-3 rounded-md px-2 py-1"
//               disabled={isPending || !isValidInput}
//             />
//           </form>
//         ) : (
//           <HeapTextInput
//             draft={draftText}
//             setDraft={setDraftText}
//             flag={chFlag}
//             className={cn(
//               isListMode ? 'flex-1' : 'h-full w-full overflow-y-hidden'
//             )}
//             inputClass={cn(
//               isListMode
//                 ? 'border-gray-100 bg-white focus-within:border-gray-300 mb-4 focus:outline-none rounded-tl-none min-h-[60px]'
//                 : 'border-gray-50 overflow-y-auto focus-within:border-gray-50 bg-gray-50 focus-within:bg-gray-50 focus:outline-none'
//             )}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
