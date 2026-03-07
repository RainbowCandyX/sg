;(async () => {
  const url = $request.url;

  // 只处理目标请求
  if (!url.includes('gate-obt.nqf.qq.com/prod/ws')) {
    $done({});
    return;
  }

  // 防重复拦截
  if (globalThis.caught) {
    $done({ status: 'reject' });
    return;
  }
  globalThis.caught = true;

  // 提取 code
  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : '';

  if (!code) {
    $notification('获取失败', '', '未拿到 code');
    $done({ status: 'reject' });
    return;
  }

  // 提取平台
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

  $notification('已获取 CODE', `平台: ${name}`, cmd);

  // 拦截请求
  $done({ status: 'reject' });
})();
