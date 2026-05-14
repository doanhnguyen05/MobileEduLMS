const LESSON_VIDEO_IDS: Record<string, string> = {
  '1': 'hzzCveeczSQ',
  '2': 'J2j1yk-34OY',
  '3': '-CCQJXKvrLM',
  '4': 'JtQ8_mJ_1jg',
  '5': '9yhlhKX7ZYM',
  '6': 'lYgiIlLIFGs',
  '7': 'FWwKjxSgLl8',
  '101': '0Xn1QhNtPkQ',
  '102': 'VL--b-vq5Cg',
  '103': '3bEkaRUVOeU',
  '104': '4zDYqKEQcDQ',
  '105': 'OtrWXLfGtqE',
  '106': 'PKGguGUwSYE',
  '201': 'sZSlTDlo0Ag',
  '202': 'MRXJjfRcNjo',
  '203': 'QHhot1qhOZ8',
  '204': 'oxp8Qqwr4AY',
  '205': 'm0QQ-hWs8fc',
  '206': '2-cgZhcd5Ec',
  '301': 'iYrgWO2oibY',
  '302': 'h-NcxT697Nk',
  '303': 'L4I1uzNkK1I',
  '304': '-LNg-K7SncM',
  '305': 'd7UxPYxgBoA',
  '306': 'iIjHHZNb_Qk',
  '401': 'PwXgg9adkdM',
  '402': '45XUCShB7c0',
  '403': 'iwOjf1l-utQ',
  '404': 'Q7hc8LVGbew',
  '405': 'lkU5s5V1GTg',
  '406': '3y23UebzCYw',
  '501': '6_wK_Ud8--0',
  '502': 'fFLBCgoHHys',
  '503': 'xc8nAcVvpxY',
  '504': 'mymWGMy9pYI',
  '505': 'h_JYW2hdI8U',
  '506': '4gUeyNkGE3g',
  '601': 'a0KJ7l5sNGw',
  '602': 'a0KJ7l5sNGw',
  '603': '5a21F33T8xQ',
  '604': 'J9qDaFTP9ao',
  '605': 'eET0YtDBWWg',
  '606': 'tIkHAybnGmA',
  '701': 'DR4Vuu_VSZA',
  '702': 'KfVf67MtqiY',
  '703': 'DR4Vuu_VSZA',
  '704': 'DR4Vuu_VSZA',
  '705': 'iZh9Tdhi6MA',
  '706': 'xxoFsYhnWOI',
  '707': 'DR4Vuu_VSZA',
  '708': 'aZdfYE2Fx2w',
};

function buildYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
}

export function resolveDemoVideoUrl(lessonId: string, videoUrl: string) {
  if (videoUrl && !videoUrl.includes('example.com')) {
    return videoUrl;
  }

  const videoId = LESSON_VIDEO_IDS[lessonId] ?? LESSON_VIDEO_IDS['1'];
  return buildYouTubeEmbedUrl(videoId);
}
