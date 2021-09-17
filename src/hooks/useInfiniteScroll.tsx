import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { ArticleType } from 'components/main/ArticleList';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  articleList: ArticleType[];
};

const NUMBER_IF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = function (
  selectedCategory: string,
  articles: ArticleType[],
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const [count, setCount] = useState<number>(1);

  const articleListByCategory = useMemo<ArticleType[]>(
    () =>
      articles.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: ArticleType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  let observer: IntersectionObserver;

  useEffect(() => {
    observer = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setCount(count => count + 1);
      observer.unobserve(entries[0].target);
    });
  });

  useEffect(() => setCount(1), [selectedCategory]);

  useEffect(() => {
    if (
      observer == null ||
      count * NUMBER_IF_ITEMS_PER_PAGE >= articleListByCategory.length ||
      containerRef.current == null ||
      containerRef.current?.children.length === 0
    ) {
      return;
    }

    observer.observe(
      containerRef.current?.children[containerRef.current?.children.length - 1],
    );
  }, [count, selectedCategory]);

  return {
    containerRef,
    articleList: articleListByCategory.slice(
      0,
      count * NUMBER_IF_ITEMS_PER_PAGE,
    ),
  };
};

export default useInfiniteScroll;
