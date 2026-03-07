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

  let name = platform === 'qq' ? 'QQ' : 'WX';

  $notification.post('已获取 CODE', `平台: ${name}`, code);

  const encoded = encodeURIComponent(code);
  $open(`shortcuts://run-shortcut?name=${encodeURIComponent('复制文本')}&input=text&text=${encoded}`);

  $done({ status: 'reject' });
})();
