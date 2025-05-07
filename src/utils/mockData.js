const videoSources = [
  'https://sf1-cdn-tos.huoshuostatic.com/obj/media-fe/xgplayer_doc_video/mp4/5c6.mp4',
  'https://sf1-cdn-tos.huoshuostatic.com/obj/media-fe/xgplayer_doc_video/mp4/5b2.mp4'
]

const avatars = [
  'https://picsum.photos/50/50?random=1',
  'https://picsum.photos/50/50?random=2'
];

export const generateMockData = (params = {}) => {
  const urlParams = new URLSearchParams(window.location.search);
  const count = parseInt(urlParams.get('count')) || params.count || 20;
  const imageRatio = parseFloat(urlParams.get('imageRatio')) || params.imageRatio || 0.7;
  const seed = urlParams.get('seed') || Date.now();

  // 初始化随机数生成器
  Math.seed = function(s) {
    return function() {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  }(seed);
  const random = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min)
  
  return Array.from({length: count}, (_, i) => ({
    id: `${seed}_${i}`,
    type: Math.random() < imageRatio ? 'image' : 'video',
    height: Math.random() < imageRatio ? random(300, 500) : random(400, 600),
    src: random(0, 1) ? 
      `https://picsum.photos/300/400?r=${seed}${i}` : 
      videoSources[random(0, videoSources.length - 1)],
    avatar: avatars[random(0, avatars.length - 1)],
    description: 'Lorem ipsum dolor sit amet ' + random(1000,9999),
    likes: Math.floor(Math.random() * (10000 - 100 + 1)) + 100
  }))
}