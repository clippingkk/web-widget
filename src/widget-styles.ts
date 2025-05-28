import type { Theme } from './types'

export const getWidgetStyles = (theme: Theme): string => `
@font-face {
  font-family: 'lxgw';
  font-weight: 400;
  src: url('https://ck-cdn.annatarhe.cn/mShzFHKsrmLXAupxbjcnwScRwel464H1/LXGWWenKai-Regular.ttf') format('truetype');
}

:host {
  font-family: lxgw, Lato, "Microsoft Jhenghei", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --logo-size: 38px;
  --avatar-size: 38px;
  font-display: swap;
  
  --card-bg-actual: ${theme === 'dark' ? 'rgba(0, 0, 0, .4)' : 'rgba(255, 255, 255, .4)'};
  --text-color-actual: ${theme === 'dark' ? '#fff' : '#333'};
  --card-shadow-actual: var(--card-bg-actual);

  padding: 1rem;
  background: var(--card-bg-actual);
  max-width: 480px;
  margin: 1rem auto;
  border-radius: 8px;
  transition: .35s box-shadow;
  cursor: pointer;
  display: block;
  color: var(--text-color-actual);
}

:host(:hover) {
  box-shadow: 0px 0px 10px var(--card-shadow-actual);
}

.ck-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.ck-profile {
  display: flex;
  align-items: center;
}

.ck-avatar {
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: 100%;
}

.ck-profile-id {
  margin-left: .5rem;
}

.ck-profile-id span:first-child { /* Name */
  display: block;
}

.ck-logo {
  width: var(--logo-size);
  height: var(--logo-size);
}

.ck-content {
  line-height: 1.5;
  font-size: 1.2rem;
  text-indent: 2.4rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
}

.ck-author {
  text-align: right;
  font-size: .8rem;
  margin-bottom: 0.25rem;
  color: ${theme === 'dark' ? '#ccc' : '#555'};
}

.ck-info {
  display: block;
  text-align: right;
  font-size: .7rem;
  color: ${theme === 'dark' ? '#bbb' : '#777'};
}

.error {
  color: red;
  font-weight: bold;
}
`
