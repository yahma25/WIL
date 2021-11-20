import { createRef, FunctionComponent, useEffect } from 'react';

type UtterancesAttributesType = {
  src: string;
  repo: string;
  'issue-term': string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
};

const CommentWidget: FunctionComponent = function () {
  const element = createRef<HTMLDivElement>();

  useEffect(() => {
    if (element.current === null) return;

    const utterances: HTMLScriptElement = document.createElement('script');

    // https://utteranc.es/
    const attributes: UtterancesAttributesType = {
      src: 'https://utteranc.es/client.js',
      repo: 'yahma25/WIL-utterances',
      'issue-term': 'title',
      label: 'Comment',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) =>
      utterances.setAttribute(key, value),
    );

    element.current.appendChild(utterances);
  }, []);

  return <div ref={element} />;
};

export default CommentWidget;
