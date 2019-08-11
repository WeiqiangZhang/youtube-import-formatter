
const urlSplit = '/watch?v=';
const embedUrl = 'https://www.youtube.com/embed/';
export function getVideoData(videoUrls) {
    const videoData = { id: "", embededUrl: [] };
    let currId = "";
    videoUrls.map((url, index) => {
        if (url) {
            currId = getVideoId(url);
            videoData.id = videoData.id.concat(index === 0 ? '' : ',', currId);
            videoData.embededUrl.push(getEmbeddedVideoUrl(currId));
        }
    });
    return videoData;
}

export function getVideoId(videoUrl) {
    return (videoUrl.split(urlSplit))[1];
}

export function getEmbeddedVideoUrl(videoId) {
    return embedUrl.concat(videoId);
}

export function formatSnippet(snippet) {
    let importArray = [];
    snippet.items.map((item) => {
        const data = item.snippet;
        const sentenceEnd = [data.description.indexOf('.'), data.description.indexOf('!'), data.description.indexOf('?')];
        const sentenceEndIdx = Math.min(...sentenceEnd.filter(end => end > 0))
        let description = data.description.substring(0, sentenceEndIdx);
        importArray.push(`Youtube{${data.title}}{${description}}{https://www.youtube.com/embed/${item.id}}`);
    });
    return importArray;
}