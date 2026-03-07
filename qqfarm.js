;(async () => {
  const url = $request.url;
  const headers = $request.headers;
  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : "未获取到 code";
  $notification("已获取 CODE", "", code);
  $done({ status: 'reject' });
})();
