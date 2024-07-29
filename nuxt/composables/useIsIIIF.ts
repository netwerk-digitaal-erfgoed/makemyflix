export default (url: string) => {
  const regex =
    /https?:\/\/[^/]+(?:\/[^/]+)*\/[^/]+\/(full|square|\d+,\d+,\d+,\d+|pct:\d+,\d+,\d+,\d+)\/(full|max|!?\d+,!?\d+|pct:\d+)\/!?(\d{1,3})\/(default|color|gray|bitonal)\.(jpg|tif|png|gif|webp|jp2)/;
  return regex.test(url);
};
