;(async () => {
  const url = $request.url;
  if (!url.includes('gate-obt.nqf.qq.com/prod/ws')) {
    $done({});
    return;
  }
  if ($persistentStore.read('qqfarm_caught') === 'true') {
    $done({});
    return;
  }
  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : '';
  if (!code) {
    $notification.post('获取失败', '', '未拿到 code');
    $done({});
    return;
  }
  $persistentStore.write('true', 'qqfarm_caught');
  $persistentStore.write(code, 'qqfarm_code');
  const platformMatch = url.match(/platform=([^&]+)/);
  const platform = platformMatch ? platformMatch[1] : '';
  let name = platform === 'qq' ? 'qq-bot' : 'wx-bot';
  console.log(`CODE: ${code}`);
  $notification.post('已获取 CODE', `平台: ${name}`, code);
  const encoded = encodeURIComponent(code);
  $open(`surge:///clipboard?text=${encoded}`);
  $done({});
})();
