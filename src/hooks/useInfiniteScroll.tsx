import { MutableRefObject, useMemo, useRef, useState } from 'react';
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

  return {
    containerRef,
    articleList: articleListByCategory.slice(
      0,
      count * NUMBER_IF_ITEMS_PER_PAGE,
    ),
  };
};

export default useInfiniteScroll;
