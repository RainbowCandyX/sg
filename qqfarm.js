;(async () => {
  const url = $request.url;

  if (!url.includes('gate-obt.nqf.qq.com/prod/ws')) {
    $done({});
    return;
  }

  if (globalThis.caught) {
    $done({
      response: {
        status: 403,
        headers: { 'Content-Type': 'text/plain' },
        body: 'blocked'
      }
    });
    return;
  }
  globalThis.caught = true;

  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : '';

  if (!code) {
    $notification.post('获取失败', '', '未拿到 code');
    $done({
      response: {
        status: 403,
        headers: { 'Content-Type': 'text/plain' },
        body: 'blocked'
      }
    });
    return;
  }

  const platformMatch = url.match(/platform=([^&]+)/);
  const platform = platformMatch ? platformMatch[1] : '';

  let name = platform === 'qq' ? 'qq-bot' : 'wx-bot';

  $persistentStore.write(code, 'qqfarm_code');
  console.log(`CODE: ${code}`);
  $notification.post('已获取 CODE', `平台: ${name}`, code);

  // 返回伪造响应，彻底拦截
  $done({
    response: {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
      body: 'blocked'
    }
  });
})();
