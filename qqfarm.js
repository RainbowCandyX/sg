;(async () => {
  const url = $request.url;

  if (!url.includes('gate-obt.nqf.qq.com/prod/ws')) {
    $done({});
    return;
  }

  if (globalThis.caught) {
    $done({ status: 'reject' });
    return;
  }
  globalThis.caught = true;

  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : '';

  if (!code) {
    $notification.post('获取失败', '', '未拿到 code');
    $done({ status: 'reject' });
    return;
  }

  const platformMatch = url.match(/platform=([^&]+)/);
  const platform = platformMatch ? platformMatch[1] : '';

  let name, suffix;
  if (platform === 'qq') {
    name = 'qq-bot';
    suffix = '';
  } else {
    name = 'wx-bot';
    suffix = ' --wx';
  }

  const cmd = `${code}`;

  $notification.post('已获取 CODE', `平台: ${name}`, cmd);

  $done({ status: 'reject' });
})();
