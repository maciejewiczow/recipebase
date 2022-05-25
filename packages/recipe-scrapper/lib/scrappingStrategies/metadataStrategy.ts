import { Strategy } from './strategy';

export const metadataStrategy: Strategy = document => {
    const descElement = document.querySelector('meta[name=description]')
        ?? document.querySelector('meta[property=og\\:description]');
    const coverImgSrcElement = document.querySelector('meta[property=og\\:image]');

    return {
        description: descElement?.attributes.content,
        coverImageSrc: coverImgSrcElement?.attributes.content,
    };
};
