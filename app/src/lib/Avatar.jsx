import React from 'react';
import classNames from 'classnames';

import trovePlaceHolderImg from '../assets/apple-touch-icon.png';

// const sizeMap = {
//   xs: { classes: 'w-6 h-6 rounded', size: 12 },
//   small: { classes: 'w-8 h-8 rounded', size: 16 },
//   default: { classes: 'w-12 h-12 rounded-lg', size: 24 },
//   huge: { classes: 'w-20 h-20 rounded-xl', size: 48 },
// };

const emptyContact = {
  nickname: '',
  bio: '',
  status: '',
  color: '#000000',
  avatar: trovePlaceHolderImg,
  cover: null,
  groups: [],
  'last-updated': 0,
};

export default function Avatar({
  // ship,
  size = 'default',
  className,
  style,
  // icon = true,
  loadImage = true,
}) {
  const { avatar } = emptyContact;
  const showImage = loadImage;

  if (showImage) {
    return (
      <img
        className={classNames(className, 'object-cover')}
        src={avatar}
        alt=""
        style={style}
      />
    );
  }

  if (avatar && showImage) {
    return (
      <img
        className={classNames(className, 'object-cover')}
        src={avatar}
        alt=""
        style={style}
      />
    );
  }

  return (
    <div
      className={classNames(
        'relative flex flex-none items-center justify-center rounded bg-black',
        size === 'xs' && 'p-1.5',
        size === 'small' && 'p-2',
        size === 'default' && 'p-3',
        size === 'huge' && 'p-3',
        className
      )}
      style={{ backgroundColor: adjustedColor, ...style }}
    >
      {sigilElement || (
        <div style={{ width: `${sigilSize}px`, height: `${sigilSize}px` }} />
      )}
    </div>
  );
}
