import React from 'react';
import classNames from 'classnames';

import trovePlaceHolderImg from '../assets/apple-touch-icon.png';

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
  size = 'default',
  className,
  style,
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
      <div style={{ width: '22px', height: '22px' }} />
    </div>
  );
}
